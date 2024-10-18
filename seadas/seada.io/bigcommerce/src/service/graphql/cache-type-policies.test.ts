import cacheTypePolicies from './cache-type-policies';

describe('cacheTypePolicies', () => {
    it('never cache cart', () => {
        expect(cacheTypePolicies.Cart.merge).toBeFalsy();
        expect(cacheTypePolicies.Customer.merge).toBeFalsy();
        expect(cacheTypePolicies.CustomerAddress.merge).toBeFalsy();
    });
});
