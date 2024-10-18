/* eslint turbo/no-undeclared-env-vars:0 */

import getSourceConfigValue from '@seada.io/core/libs/get-source-config-value';
import { clearCache } from '@seada.io/core/libs/get-env-path';

describe('getSourceConfigValue', () => {
    afterEach(() => {
        delete process.env.SOURCE__SOURCEID__CONFIG__MYPATH;
        clearCache();
    });

    it('should return the value from process.env', () => {
        const expectedValue = 'configValueFromEnv';
        process.env['SOURCE__SOURCEID__CONFIG__MYPATH'] = expectedValue;

        const result = getSourceConfigValue('sourceid', 'mypath');

        expect(result).toBe(expectedValue);
    });

    it('should return undefined when the value is not in process.env', () => {
        process.env['SOURCE__SOURCEID__CONFIG__MYPATH'] = 'configValueFromEnv';

        const result = getSourceConfigValue('sourceid', 'unknown');

        expect(result).toBe(undefined);
    });
});
