import { IUserData } from '@seada.io/user/interface/user';
import { Customer } from '@seada.io/bigcommerce/gql/schema/graphql';

const convertSeadaPersonalData = (data: IUserData): Partial<Customer> => {
    return {
        firstName: data.firstName,
        lastName: data.lastName,
    };
};

export default convertSeadaPersonalData;
