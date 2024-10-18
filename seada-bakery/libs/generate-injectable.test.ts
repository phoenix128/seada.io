import { IInjectableType } from './interface.js';
import parseInjectable from './parse-injectable.js';
import getSeadaImportName from './get-seada-import-name.js';
import generateInjectable from './generate-injectable.js';

jest.mock('./parse-injectable.js');
jest.mock('./get-seada-import-name.js');

describe('generate-injectable', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should handle IInjectableType.Reference', () => {
        const injectable = {
            type: IInjectableType.Reference,
            value: 'testValue',
        };
        const mockResult = {
            moduleName: 'mockModule',
            exportName: 'mockExport',
        };

        (parseInjectable as jest.Mock).mockReturnValue(mockResult);
        (getSeadaImportName as jest.Mock).mockReturnValue('hashedModule');

        const result = generateInjectable(injectable, []);
        expect(result).toBe('hashedModule.mockExport');

        expect(parseInjectable).toHaveBeenCalledWith(injectable);
        expect(getSeadaImportName).toHaveBeenCalledWith(mockResult.moduleName);
    });

    it('should handle IInjectableType.Array', () => {
        const injectable = {
            type: IInjectableType.Array,
            value: [
                { type: IInjectableType.Reference, value: 'testValue1' },
                { type: IInjectableType.Reference, value: 'testValue2' },
            ],
        };

        (parseInjectable as jest.Mock)
            .mockReturnValueOnce({
                moduleName: 'mockModule1',
                exportName: 'mockExport1',
            })
            .mockReturnValueOnce({
                moduleName: 'mockModule2',
                exportName: 'mockExport2',
            });

        (getSeadaImportName as jest.Mock).mockReturnValueOnce('hashedModule1').mockReturnValueOnce('hashedModule2');

        const result = generateInjectable(injectable, []);
        expect(result).toBe('[hashedModule1.mockExport1, hashedModule2.mockExport2]');
    });

    it('should handle IInjectableType.Map', () => {
        const injectable = {
            type: IInjectableType.Map,
            value: {
                key1: { type: IInjectableType.Reference, value: 'testValue1' },
                key2: { type: IInjectableType.Reference, value: 'testValue2' },
            },
        };

        (parseInjectable as jest.Mock)
            .mockReturnValueOnce({
                moduleName: 'mockModule1',
                exportName: 'mockExport1',
            })
            .mockReturnValueOnce({
                moduleName: 'mockModule2',
                exportName: 'mockExport2',
            });

        (getSeadaImportName as jest.Mock).mockReturnValueOnce('hashedModule1').mockReturnValueOnce('hashedModule2');

        const result = generateInjectable(injectable, []);
        expect(result).toBe("{'key1': hashedModule1.mockExport1, 'key2': hashedModule2.mockExport2}");
    });
});
