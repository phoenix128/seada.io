import path from 'node:path';
import fs from 'node:fs';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import cacheWrapper from '@seada.io/core/spi/cache/cache-wrapper';
import * as process from 'process';
import DontCacheError from '@seada.io/core/spi/cache/dont-cache-error';

/**
 * Get current compiled tailwind css
 */
const getCurrentCompiledTailwind = async (): Promise<string> =>
    cacheWrapper('compiled-tailwind', async () => {
        const appBuildManifest = JSON.parse(
            fs.readFileSync(path.join(process.cwd(), '.next/app-build-manifest.json')).toString()
        );

        const files = appBuildManifest.pages['/(site)/layout'].filter((file: string) => file.endsWith('.css'));
        const tailwindSignature = '! tailwindcss';

        const fetchPromises = files.map(async (file) => {
            const res = await fetch(`${getEnvPath('baseUrl')}/_next/${file}`, {
                cache: 'force-cache',
            });
            return await res.text();
        });

        const contents = await Promise.all(fetchPromises);
        const res = contents.findIndex((content) => content.includes(tailwindSignature));

        if (res === -1) {
            throw new DontCacheError('Tailwind CSS not found');
        }

        return contents[res];
    });

export default getCurrentCompiledTailwind;
