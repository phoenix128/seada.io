import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { ISchemaComponentProps, ISchemaField } from '@seada.io/core-schema/spi/components/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { Button, Select, SelectItem } from '@nextui-org/react';
import expandLocaleValue from '@seada.io/core/spi/locale/expand-locale-value';
import { ILocalizableValue } from '@seada.io/core/spi/get-localizable-value';
import { useTranslation } from 'react-i18next';
import { IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import compactLocaleValue from '@seada.io/core/spi/locale/compact-locale-value';
import Flag from '@seada.io/core-schema/components/LocalesWrapper/Flag';
import useIsAdvancedModePort from '@seada.io/core-schema/ports/schema/hooks/use-is-advanced-mode-port';

export interface ILocalesWrapperProps {
    allProps: Record<string, any>;
    onChange?: (value: ILocalizableValue) => void;
    data: ILocalizableValue;
    fieldSchema: ISchemaField;
    defaultValue?: IValueType;
    SchemaComponent: React.FC<ISchemaComponentProps>;
    addButton?: (key: string, component: React.FC) => void;
    removeButton?: (key: string) => void;
    pageData: IPageData;
    component: IPageComponentDefinition;
}

const LocalesWrapper: React.FC<ILocalesWrapperProps> = ({
    onChange,
    data: inData,
    fieldSchema,
    SchemaComponent,
    defaultValue = '',
    allProps,
    addButton,
    removeButton,
    pageData,
    component,
}) => {
    const [locale, setLocale] = useState<string>(pageData?.locale);
    const { t } = useTranslation();
    const data = useMemo(() => expandLocaleValue(inData, pageData?.allLocales), [inData, pageData?.allLocales]);

    const handleLocaleChange = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
        setLocale(evt.target.value);
    }, []);

    const handleChange = useCallback(
        (value: IValueType | IValueType[]) => {
            const valueCopy = Array.isArray(value) ? [...value] : value;

            const newData: IResponsiveValueWithBreakpoints =
                typeof data === 'object'
                    ? JSON.parse(JSON.stringify(data))
                    : { default: JSON.parse(JSON.stringify(data)) };

            if (value === undefined || value === null || value === '') {
                delete newData[locale];
            } else {
                newData[locale] = valueCopy;
            }

            onChange?.(compactLocaleValue(newData, pageData?.allLocales));
        },
        [data, locale, onChange, pageData?.allLocales]
    );

    useEffect(() => {
        setLocale(pageData?.locale);
    }, [pageData?.locale]);

    const resetLocale = useCallback(() => {
        const newData: ILocalizableValue = JSON.parse(JSON.stringify(data));
        delete newData[locale];
        onChange?.(newData);
    }, [data, locale, onChange]);

    const localeData = useMemo(() => data[locale] || defaultValue, [data, locale, defaultValue]);

    const hasOwnLocale = data?.[locale] !== undefined;
    const hasLocaleButton = hasOwnLocale && locale !== pageData?.allLocales[0];

    useEffect(() => {
        if (hasLocaleButton) {
            addButton?.('reset', () => (
                <Button className={'h-5 p-0 w-24'} size={'sm'} color={'primary'} onClick={resetLocale}>
                    {t('schema.locale.reset')}
                </Button>
            ));
        } else {
            removeButton?.('reset');
        }

        return () => {
            removeButton?.('reset');
        };
    }, [addButton, hasLocaleButton, removeButton, resetLocale, t]);

    const isMultiLocale = pageData?.allLocales.length > 1;

    const advancedMode = useIsAdvancedModePort();

    return (
        <div className={'flex flex-col gap-1'}>
            {isMultiLocale && advancedMode && (
                <Select
                    aria-label={fieldSchema.label}
                    selectedKeys={[locale]}
                    variant={'faded'}
                    size={'sm'}
                    onChange={handleLocaleChange}
                    className={'w-32'}
                    startContent={<Flag locale={locale} />}
                >
                    {pageData?.allLocales.map((l) => (
                        <SelectItem startContent={<Flag locale={l} />} key={l}>
                            {l}
                        </SelectItem>
                    ))}
                </Select>
            )}

            <SchemaComponent
                className={'w-full'}
                placeholder={data[pageData?.allLocales[0]] || defaultValue}
                allProps={allProps}
                fieldSchema={fieldSchema}
                data={localeData}
                onChange={handleChange}
                addButton={addButton}
                removeButton={removeButton}
                pageData={pageData}
                component={component}
            />
        </div>
    );
};

export default LocalesWrapper;
