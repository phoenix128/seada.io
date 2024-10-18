import path from 'node:path';
import fs from 'node:fs';

const rebootApps = async () => {
    console.log('Rebooting apps...');

    const appsPath = path.join(process.cwd(), '../apps');
    const apps = fs.readdirSync(appsPath);

    for (const app of apps) {
        const appPath = path.join(appsPath, app);

        const nextConfigPath = path.join(appPath, 'next.config.js');
        if (!fs.existsSync(nextConfigPath)) {
            continue;
        }

        // Reboot the app by touching the next.config.js file
        const nextConfig = fs.readFileSync(nextConfigPath, 'utf8');
        fs.writeFileSync(nextConfigPath, nextConfig, 'utf8');
    }
};

export default rebootApps;
