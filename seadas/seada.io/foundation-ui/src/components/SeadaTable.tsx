import { extendVariants, Table } from '@nextui-org/react';

const SeadaTable = extendVariants(Table, {
    defaultVariants: {
        radius: 'none',
    },
    variants: {
        radius: {
            none: {
                thead: ['[&>tr]:first:rounded-none'],
                th: ['first:rounded-none', 'last:rounded-none'],
            },
        },
    },
});

export default SeadaTable;
