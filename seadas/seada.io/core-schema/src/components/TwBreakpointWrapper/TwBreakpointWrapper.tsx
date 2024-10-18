import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { IResponsiveSchemaComponentProps, ISchemaField } from '@seada.io/core-schema/spi/components/interface';
import useCurrentTwBreakpointPort from '@seada.io/core-schema/ports/schema/hooks/use-current-tw-breakpoint-port';
import { useTranslation } from 'react-i18next';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { Button } from '@nextui-org/react';
import styles from '@seada.io/core-schema/components/TwBreakpointWrapper/TwBreakpointWrapper.module.css';
import useCurrentValueForTwBreakpointInSchemaComponent from '@seada.io/core-schema/hooks/tw/use-current-value-for-tw-breakpoint-in-schema-component';
import compactResponsiveValue from '@seada.io/core-schema/service/compact-responsive-value';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import expandResponsiveValue from '@seada.io/core/spi/tw/expand-responsive-value';

export interface ITwBreakpointsRef {
    resetBreakpoint: () => void;
}

export interface ITwBreakpointsProps {
    onChange?: (value: IResponsiveValueWithBreakpoints | IValueType | IValueType[]) => void;
    data: IResponsiveValueWithBreakpoints | IValueType | IValueType[];
    fieldSchema: ISchemaField;
    allProps: Record<string, any>;
    SchemaComponent: React.FC<IResponsiveSchemaComponentProps>;
    addButton?: (key: string, component: React.FC) => void;
    removeButton?: (key: string) => void;
    pageData: IPageData;
    component: IPageComponentDefinition;
}

const TwBreakpointWrapper = forwardRef<ITwBreakpointsRef, ITwBreakpointsProps>(
    (
        {
            onChange,
            allProps,
            data: inData,
            fieldSchema,
            SchemaComponent,
            addButton,
            removeButton,
            pageData,
            component,
        },
        ref
    ) => {
        const { t } = useTranslation();
        const data = useMemo(() => expandResponsiveValue(inData), [inData]);
        const breakpoint = useCurrentTwBreakpointPort();
        const breakpointData = useCurrentValueForTwBreakpointInSchemaComponent(inData);

        const resetBreakpoint = useCallback(() => {
            const newData: IResponsiveValueWithBreakpoints = JSON.parse(JSON.stringify(data));
            delete newData[breakpoint];
            onChange?.(newData);
        }, [breakpoint, data, onChange]);

        useImperativeHandle(
            ref,
            () => {
                return {
                    resetBreakpoint,
                };
            },
            [resetBreakpoint]
        );

        const handleChange = useCallback(
            (value: IValueType | IValueType[]) => {
                const valueCopy = Array.isArray(value) ? [...value] : value;

                const newData: IResponsiveValueWithBreakpoints =
                    typeof data === 'object'
                        ? JSON.parse(JSON.stringify(data))
                        : { default: JSON.parse(JSON.stringify(data)) };

                if (value === undefined || value === null || value === '') {
                    delete newData[breakpoint];
                } else {
                    newData[breakpoint] = valueCopy;
                }

                onChange?.(compactResponsiveValue(newData));
            },
            [breakpoint, data, onChange]
        );

        const hasOwnBreakpoint = data?.[breakpoint] !== undefined;
        const hasBreakpointButton = hasOwnBreakpoint && breakpoint !== 'default';

        useEffect(() => {
            if (hasBreakpointButton) {
                addButton?.('reset', () => (
                    <Button className={'h-5 p-0'} size={'sm'} color={'primary'} onClick={resetBreakpoint}>
                        {t('schema.breakpoint.reset')}
                    </Button>
                ));
            } else {
                removeButton?.('reset');
            }

            return () => {
                removeButton?.('reset');
            };
        }, [addButton, hasBreakpointButton, removeButton, resetBreakpoint, t]);

        return (
            <div className={styles.Wrapper}>
                <SchemaComponent
                    allProps={allProps}
                    fieldSchema={fieldSchema}
                    data={breakpointData}
                    onChange={handleChange}
                    addButton={addButton}
                    removeButton={removeButton}
                    pageData={pageData}
                    component={component}
                />
            </div>
        );
    }
);

TwBreakpointWrapper.displayName = 'TwBreakpointWrapper';

export default TwBreakpointWrapper;
