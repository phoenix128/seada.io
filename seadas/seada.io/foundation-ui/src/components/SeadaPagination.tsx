import { extendVariants, Pagination } from '@nextui-org/react';

const SeadaPagination = extendVariants(Pagination, {
    defaultVariants: {
        radius: 'none',
    },
    variants: {
        radius: {
            none: {
                item: ['rounded-none'],
            },
        },
    },
});

export default SeadaPagination;
