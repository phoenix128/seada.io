import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';
import React, { useMemo } from 'react';

const useMapCustomerAddressForm = (
    form: React.MutableRefObject<HTMLFormElement>,
    address?: ICustomerAddress
): (() => ICustomerAddress) => {
    return useMemo(
        () => () => {
            if (!form.current) {
                return address;
            }

            const formData = new FormData(form.current);

            return {
                id: address?.id,
                firstName: formData.get('firstName') as string,
                lastName: formData.get('lastName') as string,
                streetAddress1: formData.get('streetAddress1') as string,
                streetAddress2: formData.get('streetAddress2') as string,
                city: formData.get('city') as string,
                state: formData.get('state') as string,
                zip: formData.get('zip') as string,
                countryCode: formData.get('country') as string,
                phone: formData.get('phone') as string,
            };
        },
        [address, form]
    );
};

export default useMapCustomerAddressForm;
