import { Card, extendVariants } from '@nextui-org/react';

const SeadaCard = extendVariants(Card, {
    defaultVariants: {
        radius: 'none',
        shadow: 'none',
    },
    variants: {
        shadow: {
            none: {
                base: 'border',
            },
        },
    },
});

export default SeadaCard;
