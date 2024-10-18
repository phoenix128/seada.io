import { Customer } from '@seada.io/bigcommerce/gql/schema/graphql';
import { IUserData } from '@seada.io/user/interface/user';

const convertBigcommerceCustomer = (customer: Customer): IUserData | null => {
    if (!customer) return null;

    return {
        email: customer.email,
        firstName: customer.firstName,
        lastName: customer.lastName,
        groupId: customer.customerGroupId.toString(),
        userId: customer.entityId.toString(),
    };
};

export default convertBigcommerceCustomer;
