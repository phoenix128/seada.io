import React, { ChangeEvent, useCallback, useMemo } from 'react';
import { IResponsiveSchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import { Select, SelectItem } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { IOnCartClickSchemaType, IOnCartClickValues } from '@seada.io/cart/schema-components/OnCartClick/schema';

export interface IOnCartClickOptions {}

export interface IOnCartClickProps
    extends IResponsiveSchemaComponentProps<IOnCartClickSchemaType, IOnCartClickOptions> {
    className?: string;
}

const OnCartClick: React.FC<IOnCartClickProps> = ({
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
            onChange?.(evt.target.value as IOnCartClickValues);
        },
        [onChange]
    );

    const hasSideCart = useMemo(
        () => pageData?.pageLayout?.components?.find((c) => c?.type === '@seada.io/cart/SideCart'),
        [pageData?.pageLayout?.components]
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
                selectedKeys={[data as string]}
            >
                <SelectItem key={'sidecart'} value={'sidecart'}>
                    {t('schema.commerceUi.cartIcon.behaviour.onClickAction.sidecart')}
                </SelectItem>
                <SelectItem key={'cart'} value={'cart'}>
                    {t('schema.commerceUi.cartIcon.behaviour.onClickAction.cart')}
                </SelectItem>
            </Select>
            {data === 'sidecart' && !hasSideCart && (
                <div className="text-red-300 text-xs mt-2">
                    {t('schema.commerceUi.cartIcon.behaviour.onClickAction.sideCartWarning')}
                </div>
            )}
        </div>
    );
};

export default OnCartClick;
