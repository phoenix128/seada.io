import { Autocomplete, extendVariants } from '@nextui-org/react';

const SeadaAutocomplete = extendVariants(Autocomplete, {
    defaultVariants: {
        radius: 'none',
    },
    variants: {
        radius: {
            none: {
                popoverContent: ['rounded-none'],
            },
        },
    },
});

export default SeadaAutocomplete;
