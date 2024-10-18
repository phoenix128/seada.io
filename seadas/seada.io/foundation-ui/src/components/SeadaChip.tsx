import { Chip, extendVariants } from '@nextui-org/react';

const SeadaChip = extendVariants(Chip, {
    defaultVariants: {
        radius: 'none',
    },
});

export default SeadaChip;
