import { Customer } from '@seada.io/bigcommerce/gql/schema/graphql';
import { IUserData } from '@seada.io/user/interface/user';

const convertBigcommerceUser = (user: Customer): IUserData | null => {
    if (!user?.entityId) {
        return null;
    }

    return {
        userId: user.entityId.toString(),
        email: user.email,
        firstName: user.firstName,
        groupId: user.customerGroupId.toString(),
        lastName: user.lastName,
    };
};

export default convertBigcommerceUser;
