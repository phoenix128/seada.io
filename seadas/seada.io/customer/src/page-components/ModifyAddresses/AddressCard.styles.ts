import { tv } from 'tailwind-variants';

const addressCardStyles = tv({
    slots: {
        base: ['cursor-pointer', 'text-sm', 'h-60'],
        footer: ['text-sm', 'flex', 'justify-end', 'gap-2', 'p-2', 'border-t', 'h-12'],
        addIcon: [],
        body: ['text-sm', 'p-4'],
        header: ['text-sm', 'font-semibold', 'border-b'],
    },
    variants: {
        isNew: {
            true: {
                base: ['text-gray-500', 'hover:text-black'],
                footer: ['text-sm', 'font-semibold', 'justify-center', 'border-0'],
                addIcon: ['m-auto', 'text-center'],
            },
        },
        isLoading: {
            true: {},
        },
    },
});

export default addressCardStyles;
