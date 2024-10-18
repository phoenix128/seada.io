import React from 'react';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import { useTranslation } from 'react-i18next';
import { getCountryData, TCountryCode } from 'countries-list';
import SeadaCard from '@seada.io/foundation-ui/components/SeadaCard';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import addressCardStyles from '@seada.io/customer/page-components/ModifyAddresses/AddressCard.styles';

export interface IAddressCardUiProps {
    address: ICustomerAddress;
    onEdit?: () => void;
    onDelete?: () => void;
}

const AddressCardContent: React.FC<IAddressCardUiProps> = ({ address, onEdit, onDelete }) => {
    const { t } = useTranslation();
    const styles = addressCardStyles();

    return (
        <SeadaCard className={styles.base()} shadow={'sm'}>
            <CardHeader className={styles.header()}>
                {address.firstName} {address.lastName}
            </CardHeader>
            <CardBody className={styles.body()}>
                <div>{address.streetAddress1}</div>
                {address.streetAddress2 && <div>{address.streetAddress2}</div>}
                <div>
                    {address.city}, {address.state} {address.zip}
                </div>
                <div>{getCountryData(address.countryCode as TCountryCode).name}</div>
            </CardBody>
            <CardFooter className={styles.footer()}>
                <SeadaButton size={'sm'} color={'primary'} onClick={onEdit}>
                    {t('customer.address.edit')}
                </SeadaButton>
                <SeadaButton size={'sm'} color={'danger'} onClick={onDelete}>
                    {t('customer.address.delete')}
                </SeadaButton>
            </CardFooter>
        </SeadaCard>
    );
};

export default AddressCardContent;
