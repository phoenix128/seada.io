import { IPageData } from '@seada.io/core/spi/components/interface';
import postcss, { AtRule, parse, Root, Rule } from 'postcss';
import tailwindcss, { Config as TailwindConfig } from 'tailwindcss';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import getTwCustomConfig from '@seada.io/core/spi/tw/get-tw-custom-config';
import md5 from 'md5';
import cacheWrapper from '@seada.io/core/spi/cache/cache-wrapper';
import { profilerWrapperAsync } from '@seada.io/core/libs/profile';
import getCurrentCompiledTailwind from '@seada.io/core/spi/tw/get-compiled-tailwind';

/**
 * Generate rule key with parent selector
 * @param rule
 * @param parents
 */
const generateRuleKey = (rule: Rule, parents: AtRule[]): string => {
    return parents.map((parent) => `${parent.name} ${parent.params}`).join(' > ') + ` > ${rule.selector}`;
};

/**
 * Recursively get all params values from components
 * @param components
 */
const recursivelyGetParamsValues = (components: IPageComponentDefinition[]): string[] => {
    if (!components) return [];

    let res = [];
    for (const component of components) {
        for (const propValue of Object.values(component.providedProps)) {
            if (typeof propValue === 'string') {
                res.push(propValue);
            }
        }

        if (component.children?.length) {
            res = [...res, ...recursivelyGetParamsValues(component.children)];
        }
    }

    return res;
};

/**
 * Ensure parent path exists
 * @param rule
 * @param parents
 * @param root
 * @param parentMap
 */
const ensureParentPath = (
    rule: Rule,
    parents: AtRule[],
    root: Root,
    parentMap: Map<string, Root | AtRule>
): Root | AtRule => {
    let currentContext: Root | AtRule = root;
    let path = '';

    parents.forEach((parent) => {
        path += ` > ${parent.name} ${parent.params}`;

        if (!parentMap.has(path)) {
            const newParent = postcss.atRule({ name: parent.name, params: parent.params });
            currentContext.append(newParent);
            parentMap.set(path, newParent);
            currentContext = newParent;
        } else {
            currentContext = parentMap.get(path) as AtRule;
        }
    });

    return currentContext;
};

/**
 * Extract missing rules from dynamic tailwind css
 * @param systemTailwindCss
 * @param dynamicTailwind
 */
const extractMissingRules = (systemTailwindCss: postcss.Root, dynamicTailwind: postcss.Root): string => {
    const filteredResult: Root = postcss.root();
    const parentMap: Map<string, Root | AtRule> = new Map();

    const existingRules: Set<string> = new Set();
    systemTailwindCss.walkRules((rule) => {
        const parents: AtRule[] = [];
        let parent: AtRule | undefined = rule.parent as AtRule;
        while (parent && parent.type === 'atrule') {
            parents.unshift(parent);
            parent = parent.parent as AtRule;
        }
        const key = generateRuleKey(rule, parents);
        existingRules.add(key);
    });

    dynamicTailwind.walkRules((rule) => {
        const parents: AtRule[] = [];
        let parent: AtRule | undefined = rule.parent as AtRule;
        while (parent && parent.type === 'atrule') {
            parents.unshift(parent);
            parent = parent.parent as AtRule;
        }
        const key = generateRuleKey(rule, parents);

        if (!existingRules.has(key)) {
            const targetContext = ensureParentPath(rule, parents, filteredResult, parentMap);
            targetContext.append(rule.clone());
        }
    });

    return filteredResult.toString();
};

/**
 * Dynamically build tailwind css depending on the page components
 * @param pageData
 */
const bakeTwPageStyle = async (pageData: IPageData): Promise<string> =>
    profilerWrapperAsync('bakeTwPageStyle', async () => {
        const raw = [
            ...recursivelyGetParamsValues(pageData.pageLayout.components),
            ...recursivelyGetParamsValues(pageData.pageTemplate.components),
        ].join(' ');

        const cacheKey = `baked-tw:${md5(raw)}`;

        return cacheWrapper(cacheKey, async () => {
            const compiledTailwindCss = await getCurrentCompiledTailwind();
            const tailwindConfig = getTwCustomConfig();

            const config: TailwindConfig = {
                ...tailwindConfig,
                content: [
                    {
                        raw,
                        extension: 'css',
                    },
                ],
                corePlugins: {
                    preflight: false,
                },
            };

            const inputCss = '@tailwind components; @tailwind utilities;';
            const dynamicTailwind = await postcss([tailwindcss(config)]).process(inputCss, { from: undefined });
            const systemTailwind = parse(compiledTailwindCss);

            return extractMissingRules(systemTailwind, dynamicTailwind.root);
        });
    });

export default bakeTwPageStyle;
