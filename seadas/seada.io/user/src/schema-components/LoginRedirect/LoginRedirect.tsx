import React, { ChangeEvent, useCallback } from 'react';
import { IResponsiveSchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { CgAsterisk, CgHome, CgUser } from 'react-icons/cg';
import { ILoginRedirectSchemaType, ILoginRedirectValues } from '@seada.io/user/schema-components/LoginRedirect/schema';

export interface ILoginRedirectOptions {}

export interface ILoginRedirectProps
    extends IResponsiveSchemaComponentProps<ILoginRedirectSchemaType, ILoginRedirectOptions> {
    className?: string;
}

const LoginRedirect: React.FC<ILoginRedirectProps> = ({
    onChange,
    className,
    fieldSchema,
    data: inData,
    disabled,
    pageData,
    component,
}) => {
    const { t } = useTranslation();
    const data = inData ?? fieldSchema.defaultValue;

    const handleChange = useCallback(
        (evt: ChangeEvent<HTMLSelectElement>) => {
            onChange?.(evt.target.value as ILoginRedirectValues);
        },
        [onChange]
    );

    return (
        <div className={className}>
            <Select
                isDisabled={disabled}
                variant={'faded'}
                size={'sm'}
                labelPlacement={'outside'}
                aria-label={fieldSchema.label}
                onChange={handleChange}
                selectedKeys={[data]}
            >
                <SelectItem key={'none'} value={'none'} startContent={<CgAsterisk size={16} />}>
                    {t('schema.userUi.loginForm.behaviour.loginRedirectOptions.none')}
                </SelectItem>
                <SelectItem key={'home'} value={'home'} startContent={<CgHome size={16} />}>
                    {t('schema.userUi.loginForm.behaviour.loginRedirectOptions.home')}
                </SelectItem>
                <SelectItem key={'account'} value={'account'} startContent={<CgUser size={16} />}>
                    {t('schema.userUi.loginForm.behaviour.loginRedirectOptions.account')}
                </SelectItem>
            </Select>
        </div>
    );
};

export default LoginRedirect;
