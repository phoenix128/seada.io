import transformer from '@seada.io/core-schema/schema-components/TwBorderWidth/transformer';

describe('TwBorderWidth transformer', () => {
    it('should compute correct class when a number is given', () => {
        const classNames = transformer(2);
        expect(classNames).toEqual('border-2');
    });

    it('should compute correct class when a number is given in sided mode', () => {
        const classNames = transformer(['2', '4', '8', '2']);
        expect(classNames).toEqual('border-t-2 border-r-4 border-b-8 border-l-2');
    });

    it('should compute correct class when 1 is given', () => {
        const classNames = transformer(1);
        expect(classNames).toEqual('border');
    });

    it('should compute correct class when 1 is given in sided mode', () => {
        const classNames = transformer(['1', '1', '1', '1']);
        expect(classNames).toEqual('border-t border-r border-b border-l');
    });
});
