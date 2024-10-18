import React, { ReactElement, useEffect, useState } from 'react';
import styles from '@seada.io/core-schema/components/RadioChips/RadioChips.styles';
import { Chip } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

export interface IRadioChipsOption {
    label: string;
    value: string;
    component?: ReactElement;
}

export interface IRadioChipsProps {
    className?: string;
    showLabels?: boolean;
    options: IRadioChipsOption[];
    onChange?: (value: string) => void;
    value?: string;
}

const RadioChips: React.FC<IRadioChipsProps> = ({ options, className, value, onChange, showLabels = true }) => {
    const [currentValue, setCurrentValue] = useState<string | undefined>(value);
    useEffect(() => {
        setCurrentValue(value);
    }, [value]);

    return (
        <div className={twMerge(styles.RadioChips, className)}>
            {options.map((option, index) => {
                const color = currentValue === option.value ? 'primary' : 'default';

                const handleClick = () => {
                    setCurrentValue(option.value);
                    onChange && onChange(option.value);
                };

                return (
                    <div key={index} className={styles.OptionChip}>
                        <Chip
                            radius={'sm'}
                            onClick={handleClick}
                            color={color}
                            title={option.label}
                            aria-label={option.label}
                        >
                            {option.component || option.label}
                        </Chip>
                        {showLabels && <div className={styles.Label}>{option.label}</div>}
                    </div>
                );
            })}
        </div>
    );
};

export default RadioChips;
