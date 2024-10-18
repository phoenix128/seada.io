import React from 'react';
import { IProductStandardOption } from '@seada.io/catalog/interface/product-options';
import styles from '@seada.io/catalog/page-components/ProductOptions/ProductOptions.styles';
import { twMerge } from 'tailwind-merge';

export interface IOptionsRectangleProps {
    option: IProductStandardOption;
    onChange?: (value: string) => void;
    value: string;
    allowedValues: string[];
}

const OptionsRectangle: React.FC<IOptionsRectangleProps> = (props) => {
    const {
        onChange,
        value,
        allowedValues,
        option: { values },
    } = props;

    return (
        <div className={styles.RectangleOptions}>
            {values.map((v) => {
                const isDisabled = !allowedValues?.includes(v.value);
                const isSelected = value === v.value;

                const handleClick = () => {
                    if (isDisabled) return;
                    onChange && onChange(v.value);
                };

                return (
                    <div
                        onClick={handleClick}
                        className={twMerge(
                            styles.RectangleOptionValue,
                            isSelected && styles.Selected,
                            isDisabled && styles.Disabled
                        )}
                        key={v.id}
                    >
                        {v.label}
                    </div>
                );
            })}
        </div>
    );
};

export default OptionsRectangle;
