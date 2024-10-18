import { Config as TailwindConfig } from 'tailwindcss';
import tailwindCustomConfig from '@seada.io/core/spi/tw/tailwind-custom-config.generated';

const getTwCustomConfig = (): TailwindConfig => {
    return tailwindCustomConfig as TailwindConfig;
};

export default getTwCustomConfig;
