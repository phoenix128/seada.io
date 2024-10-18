import applyComponentPropMiddleware from '@seada.io/core/spi/seada-pages/manipulation/apply-component-prop-middleware';
import applyPageComponentPropsMiddlewares from '@seada.io/core/service/components/apply-page-component-props-middlewares';
import { IPageData } from '@seada.io/core/spi/components/interface';

jest.mock('@seada.io/core/spi/seada-pages/manipulation/apply-component-prop-middleware');

describe('applyPageComponentPropsMiddlewares', () => {
    it('should apply middleware to top-level components', () => {
        const pageData = {
            pageLayout: {
                components: [{ id: 'component1', providedProps: {}, children: [] }],
            },
            pageTemplate: {
                components: [],
            },
        } as IPageData;

        const modifiedProps = { someProp: 'modified' };
        (applyComponentPropMiddleware as jest.Mock).mockReturnValue(modifiedProps);

        const result = applyPageComponentPropsMiddlewares(pageData);

        expect(result.pageLayout.components[0].providedProps).toEqual(modifiedProps);
    });

    it('should apply middleware to nested children components', () => {
        const pageData = {
            pageLayout: {
                components: [
                    {
                        id: 'component1',
                        providedProps: {},
                        children: [{ id: 'child1', providedProps: {}, children: [] }],
                    },
                ],
            },
            pageTemplate: {
                components: [],
            },
        } as IPageData;
        const modifiedProps = { someProp: 'modified' };
        (applyComponentPropMiddleware as jest.Mock).mockReturnValue(modifiedProps);

        const result = applyPageComponentPropsMiddlewares(pageData);

        expect(result.pageLayout.components[0].children[0].providedProps).toEqual(modifiedProps);
    });

    it('should handle empty components gracefully', () => {
        const pageData = {
            pageLayout: {
                components: [],
            },
            pageTemplate: {
                components: [],
            },
        } as IPageData;

        const result = applyPageComponentPropsMiddlewares(pageData);

        expect(result.pageLayout.components).toEqual([]);
        expect(result.pageTemplate.components).toEqual([]);
    });

    it('should not mutate the original page data', () => {
        const pageData = {
            pageLayout: {
                components: [{ id: 'component1', providedProps: {}, children: [] }],
            },
            pageTemplate: {
                components: [],
            },
        } as IPageData;

        const pageDataCopy = JSON.parse(JSON.stringify(pageData));

        applyPageComponentPropsMiddlewares(pageData);

        expect(pageData).toEqual(pageDataCopy);
    });
});
