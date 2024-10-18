import { Switch } from '@nextui-org/react';
import styles from '@seada.io/builder/components/AdvancedModeSwitch/AdvancedModeSwitch.module.css';
import React, { ChangeEvent, useCallback, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';

export interface IAdvancedModeSwitchProps {
    className?: string;
}

const AdvancedModeSwitch: React.FC<IAdvancedModeSwitchProps> = ({ className }) => {
    const { advancedMode, setAdvancedMode } = useContext(BuilderContext);
    const { t } = useTranslation();
    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            setAdvancedMode(evt.target.checked);
        },
        [setAdvancedMode]
    );

    return (
        <Switch
            size={'sm'}
            className={twMerge(className, styles.AdvancedModeSwitch)}
            isSelected={advancedMode}
            onChange={handleChange}
        >
            <span className={styles.Label}>{t('builder.props.advancedMode')}</span>
        </Switch>
    );
};

export default AdvancedModeSwitch;
