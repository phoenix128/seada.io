import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import React, { FormEvent, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import editAddressFormStyles from '@seada.io/customer/page-components/ModifyAddresses/EditAddressForm.styles';
import CountryListSelect from '@seada.io/customer/components/CountryListSelect';
import SeadaInput from '@seada.io/foundation-ui/components/SeadaInput';

export interface IEditAddressFormProps {
    address: ICustomerAddress;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const EditAddressForm = forwardRef<HTMLFormElement, IEditAddressFormProps>(({ address, onSubmit }, formRef) => {
    const { t } = useTranslation();
    const styles = editAddressFormStyles();

    return (
        <form ref={formRef} className={styles.base()} onSubmit={onSubmit}>
            <SeadaInput name={'firstName'} label={t('customer.address.firstName')} defaultValue={address?.firstName} />
            <SeadaInput name={'lastName'} label={t('customer.address.lastName')} defaultValue={address?.lastName} />
            <SeadaInput
                name={'streetAddress1'}
                label={t('customer.address.streetAddress1')}
                defaultValue={address?.streetAddress1}
            />
            <SeadaInput
                name={'streetAddress2'}
                label={t('customer.address.streetAddress2')}
                defaultValue={address?.streetAddress2}
            />
            <SeadaInput name={'city'} label={t('customer.address.city')} defaultValue={address?.city} />
            <SeadaInput name={'state'} label={t('customer.address.state')} defaultValue={address?.state} />
            <SeadaInput name={'zip'} label={t('customer.address.zip')} defaultValue={address?.zip} />
            <CountryListSelect
                name={'country'}
                label={t('customer.address.country')}
                defaultSelectedKeys={[address?.countryCode]}
            />
        </form>
    );
});

EditAddressForm.displayName = 'EditAddressForm';

export default EditAddressForm;
