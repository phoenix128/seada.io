import React from 'react';
import { IProductSwatchOption } from '@seada.io/catalog/interface/product-options';
import styles from '@seada.io/catalog/page-components/ProductOptions/ProductOptions.styles';
import { twMerge } from 'tailwind-merge';

export interface IOptionsSwatchProps {
    option: IProductSwatchOption;
    onChange?: (value: string) => void;
    value: string;
    allowedValues: string[];
}

const OptionsSwatch: React.FC<IOptionsSwatchProps> = (props) => {
    const {
        onChange,
        value,
        allowedValues,
        option: { values },
    } = props;

    return (
        <div className={styles.SwatchOptions}>
            {values.map((v) => {
                const style = v.imageUrl ? { backgroundImage: 'url(' + v.imageUrl + ')' } : {};

                const isSelected = value === v.value;
                const isDisabled = !allowedValues?.includes(v.value);

                const handleClick = () => {
                    if (isDisabled) return;
                    onChange && onChange(v.value);
                };

                return (
                    <div
                        onClick={handleClick}
                        className={twMerge(
                            styles.SwatchOptionValue,
                            isSelected && styles.Selected,
                            isDisabled && styles.Disabled
                        )}
                        key={v.id}
                        style={style}
                    >
                        {v.colors &&
                            v.colors.map((c) => (
                                <div className={styles.SwatchOptionColor} key={c} style={{ backgroundColor: c }}></div>
                            ))}
                    </div>
                );
            })}
        </div>
    );
};

export default OptionsSwatch;
