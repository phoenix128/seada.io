import runBakery from './libs/run-bakery.js';
import chokidar from 'chokidar';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import _ from 'lodash';
import fs from 'node:fs';
import rebootApps from './libs/reboot-apps.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const absoluteModulesPath = path.join(__dirname, '../seadas');

const watcher = chokidar.watch(
    [
        path.join(absoluteModulesPath, '**', 'package.json').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'seada.yml').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', '*.yml').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'page-components', '**', 'index.tsx').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'page-components', '**', 'data-provider.ts').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'page-components', '**', 'schema.ts').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'schema-components', '**', 'index.tsx').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'adapters', '**', '*.ts').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'plugins', '**', '*.ts').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'plugins', '**', '*.tsx').replace(/\\/g, '/'),
        path.join(absoluteModulesPath, '**', 'src', 'get-i18n.ts').replace(/\\/g, '/'),
    ],
    {
        ignored: [
            '**/node_modules/**',
            '**/.git/**',
            '**/dist/**',
            '**/build/**',
            '**/.turbo/**',
            '**/.next/**',
            '**/.seada-cache/**',
            '**/generated/**',
        ],
        persistent: true,
        awaitWriteFinish: true,
    }
);

const DEBOUNCE_TIMEOUT = 100;

let filesList = [];
let isReady = false;
let debounceTimeout = null;

const runAndUpdateFilesList = async () => {
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = setTimeout(() => {
        (async () => {
            try {
                const startTime = Date.now();
                const newFilesList = await runBakery();

                const filesToRemove = _.difference(filesList, newFilesList);
                const filesToAdd = _.difference(newFilesList, filesList);
                let shouldRestart = false;

                for (const file of filesToRemove) {
                    if (fs.existsSync(file)) {
                        shouldRestart = true;
                        watcher.unwatch(file);
                    }
                }

                for (const file of filesToAdd) {
                    if (fs.existsSync(file)) {
                        shouldRestart = true;
                        watcher.add(file);
                    }
                }

                if (shouldRestart && isReady) {
                    await rebootApps();
                }

                filesList = newFilesList;

                debounceTimeout = null;
                const endTime = Date.now();
                console.log(`Configuration baked in ${endTime - startTime}ms`);
            } catch (error) {
                console.error(error);
            }
        })();
    }, DEBOUNCE_TIMEOUT);
};

watcher
    .on('change', async (path) => {
        if (!isReady) return;

        await runAndUpdateFilesList();
        console.log('Change detected: ' + path.replace(absoluteModulesPath, ''));
    })
    .on('add', async (path) => {
        if (!isReady) return;
        await runAndUpdateFilesList();
    })
    .on('error', async (error) => {
        console.error(error);
    });

watcher.on('ready', async () => {
    await runAndUpdateFilesList();
    console.log('Watching for changes in modules...');

    setTimeout(() => {
        isReady = true;
    }, 1000);
});
