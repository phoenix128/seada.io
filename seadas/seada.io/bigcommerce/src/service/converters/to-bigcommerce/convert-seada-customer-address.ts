import { CustomerAddress } from '@seada.io/bigcommerce/gql/schema/graphql';
import { ICustomerAddress } from '@seada.io/customer/interface/customer-address';

const convertSeadaCustomerAddress = (data: ICustomerAddress): Partial<CustomerAddress> => {
    return {
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        address1: data.streetAddress1 || '',
        address2: data.streetAddress2 || '',
        city: data.city || '',
        stateOrProvince: data.state || '',
        postalCode: data.zip || '',
        countryCode: data.countryCode || '',
        phone: data.phone || '',
    };
};

export default convertSeadaCustomerAddress;
