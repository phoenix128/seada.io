import { Money } from '@seada.io/bigcommerce/gql/schema/graphql';
import { IPrice } from '@seada.io/catalog/interface/price';

const convertBigcommercePrice = (price: Money): IPrice => {
    return {
        amount: price.value,
        currency: price.currencyCode,
    };
};

export default convertBigcommercePrice;
