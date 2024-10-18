import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    IResponsiveSchemaComponentProps,
    ISchemaField,
    ISchemaType,
} from '@seada.io/core-schema/spi/components/interface';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import styles from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper.module.css';
import { twMerge } from 'tailwind-merge';
import { Button } from '@nextui-org/react';
import { IconType } from 'react-icons';
import { CgLock } from 'react-icons/cg';
import useBestLock from '@seada.io/core-schema/hooks/use-best-lock';
import expandDimensionedValue from '@seada.io/core-schema/service/expand-dimensioned-value';
import compactDimensionedValue from '@seada.io/core-schema/service/compact-dimensioned-value';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

export type IDimensionedSchemaComponent<TOptions = Record<string, any>> = {
    label?: string;
    component: React.FC<IResponsiveSchemaComponentProps<ISchemaType>>;
    options?: TOptions;
};

export enum EDisplayMode {
    INLINE = 'inline',
    VERTICAL = 'vertical',
}

export type IDimensionsLock = {
    icons?: IconType[];
    keys: number[][];
    classNames?: string[];
};

export interface ITwDimensionsWrapperProps {
    allProps: Record<string, any>;
    onChange?: (value: IValueType | IValueType[]) => void;
    data: IValueType | IValueType[];
    fieldSchema: ISchemaField;
    display?: EDisplayMode;
    defaultValue?: IValueType;
    SchemaComponents: IDimensionedSchemaComponent[];
    locks: IDimensionsLock[];
    addButton?: (key: string, component: React.FC) => void;
    removeButton?: (key: string) => void;
    pageData: IPageData;
    component: IPageComponentDefinition;
}

const TwDimensionsWrapper: React.FC<ITwDimensionsWrapperProps> = ({
    onChange,
    data: inData,
    display = EDisplayMode.VERTICAL,
    fieldSchema,
    SchemaComponents,
    defaultValue = 'auto',
    allProps,
    locks: locksIn,
    addButton,
    removeButton,
    pageData,
    component,
}) => {
    const size = useMemo(() => SchemaComponents.length, [SchemaComponents]);
    const data = useMemo(() => {
        return expandDimensionedValue(inData, size, defaultValue);
    }, [defaultValue, inData, size]);

    const initialLockNo = useBestLock(data, locksIn);
    const [lockNo, setLockNo] = useState<number>(initialLockNo);
    const [locks, setLocks] = useState<IDimensionsLock[]>(locksIn);

    const handleChange = useCallback(
        (keys: number[], value: IValueType) => {
            // Make sure all values are always passed
            const dimensionedValue = [...data];
            for (let i = 0; i < SchemaComponents.length; i++) {
                if (keys.includes(i)) {
                    dimensionedValue[i] = value;
                } else {
                    dimensionedValue[i] = dimensionedValue[i] ?? defaultValue;
                }
            }

            onChange?.(compactDimensionedValue(dimensionedValue));
        },
        [SchemaComponents.length, data, defaultValue, onChange]
    );

    const modeClass = useMemo(() => {
        switch (display) {
            case EDisplayMode.INLINE:
                return styles.InlineMode;
            case EDisplayMode.VERTICAL:
                return styles.VerticalMode;
            default:
                return styles.VerticalMode;
        }
    }, [display]);

    const masterCells = useMemo(() => locks[lockNo]?.keys.map((l) => l[0]), [lockNo, locks]);

    useEffect(() => {
        if (locks) {
            const handleLockClick = () => {
                setLockNo((lockNo + 1) % locks.length);
            };

            addButton?.('lock', () => {
                const { icons } = locks[lockNo];
                return (
                    <Button size={'sm'} color={'primary'} onClick={handleLockClick}>
                        {!icons && <CgLock />}
                        {icons?.map((Icon, idx) => (
                            <Icon key={idx} />
                        ))}
                    </Button>
                );
            });
        }

        return () => {
            removeButton?.('lock');
        };
    }, [addButton, lockNo, locks, removeButton]);

    return (
        <div className={twMerge(modeClass, styles.TwDimensionsWrapper)}>
            {SchemaComponents.map((dimension, idx) => {
                const isMasterCell = masterCells?.includes(idx);
                const keyNo = locks[lockNo].keys.findIndex((n) => n.includes(idx));
                const involvedCells = locks[lockNo].keys[keyNo];

                const handleDimensionChange = (value: IValueType) => {
                    handleChange(involvedCells, value);
                };

                if (!isMasterCell) return null;

                return (
                    <div key={idx} className={twMerge(styles.DimensionItem)}>
                        {display === EDisplayMode.VERTICAL && (
                            <div className={styles.DimensionItemLabel}>{dimension.label}</div>
                        )}

                        <dimension.component
                            className={locks[lockNo].classNames?.[keyNo]}
                            disabled={!isMasterCell}
                            allProps={allProps}
                            fieldSchema={{
                                ...fieldSchema,
                                options: {
                                    ...fieldSchema.options,
                                    ...dimension.options,
                                },
                                label: dimension.label,
                            }}
                            data={data?.[idx]}
                            onChange={handleDimensionChange}
                            pageData={pageData}
                            component={component}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default TwDimensionsWrapper;
