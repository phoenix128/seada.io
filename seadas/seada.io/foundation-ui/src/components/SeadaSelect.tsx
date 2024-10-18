import { extendVariants, Select } from '@nextui-org/react';

const SeadaSelect = extendVariants(Select, {
    defaultVariants: {
        radius: 'none',
    },
});

export default SeadaSelect;
