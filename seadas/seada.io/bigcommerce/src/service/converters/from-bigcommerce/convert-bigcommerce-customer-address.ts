import { CustomerAddress } from '@seada.io/bigcommerce/gql/schema/graphql';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';

const convertBigcommerceCustomerAddress = (address: CustomerAddress): ICustomerAddress => {
    return {
        id: address.entityId.toString(),
        firstName: address.firstName,
        lastName: address.lastName,
        streetAddress1: address.address1,
        streetAddress2: address.address2,
        city: address.city,
        state: address.stateOrProvince,
        zip: address.postalCode,
        countryCode: address.countryCode,
        phone: address.phone,
    };
};

export default convertBigcommerceCustomerAddress;
