import removeEmptyChildren from '@seada.io/core/spi/seada-pages/manipulation/remove-empty-children';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

describe('removeEmptyChildren', () => {
    it('should remove children property if it is empty', () => {
        const input = [{ id: '1', children: [] }, { id: '2' }] as IPageComponentDefinition[];
        const expected = [{ id: '1' }, { id: '2' }];

        expect(removeEmptyChildren(input)).toEqual(expected);
    });

    it('should keep children property if it contains elements', () => {
        const input = [{ id: '1', children: [{ id: '1.1' }] }] as IPageComponentDefinition[];
        const expected = [{ id: '1', children: [{ id: '1.1' }] }];

        expect(removeEmptyChildren(input)).toEqual(expected);
    });

    it('should work recursively on nested components', () => {
        const input = [{ id: '1', children: [{ id: '1.1', children: [] }] }] as IPageComponentDefinition[];
        const expected = [{ id: '1', children: [{ id: '1.1' }] }];

        expect(removeEmptyChildren(input)).toEqual(expected);
    });
});
