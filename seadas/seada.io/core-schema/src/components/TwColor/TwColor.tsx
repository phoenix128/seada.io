import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem, Slider } from '@nextui-org/react';
import ColorPreview from '@seada.io/core-schema/components/TwColor/ColorPreview';
import styles from '@seada.io/core-schema/components/TwColor/TwColor.module.css';
import useTwColors from '@seada.io/core-schema/hooks/tw/use-tw-colors';
import useSchemaValueTranslation from '@seada.io/core-schema/hooks/use-schema-value-translation';
import { useTranslation } from 'react-i18next';

export type ITwColorSchemaOptions = {
    withTransparent?: boolean;
};

export type ITwColorProps = IResponsiveSchemaComponentProps<ISchemaType<string>, ITwColorSchemaOptions>;

export interface IColorOption {
    value: string;
    label: string;
    color: string;
    isShaded: boolean;
}

const TwColor: React.FC<ITwColorProps> = ({ data, onChange, fieldSchema }) => {
    const colors = useTwColors();
    const { t } = useSchemaValueTranslation();
    const { t: t2 } = useTranslation();
    const { withTransparent = false } = fieldSchema.options || {};

    const [colorName, colorShade] = data?.split('-') || [withTransparent ? 'transparent' : 'black', '500'];
    const isShaded = typeof colors?.[colorName] === 'object';
    const colorShades = useMemo(() => Object.keys(colors?.[colorName] || {}), [colorName, colors]);

    const handleColorNameChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            const { value } = evt.target;
            const valueIsShaded = typeof colors?.[value] === 'object';
            onChange(valueIsShaded ? value + '-' + colorShade : value);
        },
        [colorShade, colors, onChange]
    );

    const handleShadeChange = useCallback(
        (value: number) => {
            onChange(colorName + '-' + colorShades[value]);
        },
        [colorName, colorShades, onChange]
    );

    const colorsOptions = useMemo(() => {
        const colorsOptions: IColorOption[] = [];

        Object.keys(colors).forEach((color) => {
            if (color === 'transparent' && !withTransparent) return;

            const isShaded = typeof colors?.[color] === 'object';
            const colorHex = isShaded ? colors[color]['500'] : colors[color];

            colorsOptions.push({
                value: color,
                label: t('color.name', color),
                color: colorHex,
                isShaded,
            });
        });

        return colorsOptions;
    }, [colors, t, withTransparent]);

    const shadesMarks = useMemo(() => {
        if (!isShaded) return [];

        return Object.keys(colors[colorName]).map((shade, idx) => ({
            value: idx,
            label: (parseInt(shade, 10) / 10).toString(),
        }));
    }, [colorName, colors, isShaded]);

    const colorShadeIndex = colorShades.indexOf(colorShade);
    const colorHex = isShaded ? colors[colorName][colorShade] : colors[colorName];

    return (
        <div>
            <Select
                variant={'faded'}
                size={'sm'}
                labelPlacement={'outside'}
                aria-label={fieldSchema.label}
                startContent={<ColorPreview color={colorHex} />}
                onChange={handleColorNameChange}
                selectedKeys={[colorName]}
            >
                {colorsOptions.map((colorOption: IColorOption) => (
                    <SelectItem
                        key={colorOption.value}
                        value={colorOption.value}
                        aria-label={colorOption.label}
                        startContent={<ColorPreview color={colorOption.color} />}
                    >
                        {colorOption.label}
                    </SelectItem>
                ))}
            </Select>

            {isShaded && (
                <div className={styles.ColorPreview}>
                    <div className={styles.ShadeLabel}>{t2('schema.color.shade')}</div>
                    <Slider
                        aria-label={fieldSchema.label}
                        value={colorShadeIndex}
                        marks={shadesMarks}
                        showSteps={true}
                        showOutline={true}
                        radius={'full'}
                        size={'sm'}
                        minValue={0}
                        maxValue={shadesMarks.length - 1}
                        onChange={handleShadeChange}
                    />
                </div>
            )}
        </div>
    );
};

export default TwColor;
