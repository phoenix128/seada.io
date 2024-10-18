import React, { PropsWithChildren } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import VariableInputItem from '@seada.io/core-schema/components/VariableInput';
import {
    IResponsiveSchemaComponentProps,
    ISchemaField,
    ISchemaType,
} from '@seada.io/core-schema/spi/components/interface';
import { useTranslation } from 'react-i18next';
import { CgCode, CgPen } from 'react-icons/cg';
import VariableInputArray, {
    IVariableInputArrayProps,
} from '@seada.io/core-schema/components/VariableInput/VariableInputArray';
import useIsAdvancedModePort from '@seada.io/core-schema/ports/schema/hooks/use-is-advanced-mode-port';
import { IVariableInputProps } from '@seada.io/core-schema/components/VariableInput/VariableInput';

export type IVariableWrapperProps = IResponsiveSchemaComponentProps & {
    fieldSchema: ISchemaField<ISchemaType<string | string[]>>;
    isArray?: boolean;
    maxItems?: number;
};

const VariableWrapper: React.FC<PropsWithChildren<IVariableWrapperProps>> = (props) => {
    const { children, isArray, maxItems } = props;
    const { t } = useTranslation();

    const advancedMode = useIsAdvancedModePort();
    if (!advancedMode) return children as React.JSX.Element;

    return (
        <Tabs aria-label="Mode" color="primary" size={'sm'} fullWidth>
            <Tab
                className={'w-full'}
                key="default"
                title={
                    <div className={'flex flex-row gap-1 items-center'}>
                        <CgPen className={'w-4 h-4 text-gray-400'} />
                        <span className={'text-white'}>{t('schema.variables.mode.default')}</span>
                    </div>
                }
            >
                {children}
            </Tab>
            <Tab
                className={'w-full'}
                key="raw"
                title={
                    <div className={'flex flex-row gap-1 items-center'}>
                        <CgCode className={'w-4 h-4 text-gray-400'} />
                        <span className={'text-white'}>{t('schema.variables.mode.raw')}</span>
                    </div>
                }
            >
                {!isArray && <VariableInputItem {...(props as IVariableInputProps)} />}
                {isArray && <VariableInputArray {...(props as IVariableInputArrayProps)} maxItems={maxItems} />}
            </Tab>
        </Tabs>
    );
};

export default VariableWrapper;
