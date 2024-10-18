import { tv } from 'tailwind-variants';

const productCardStyles = tv({
    slots: {
        base: ['p-2', 'bg-gray-50'],
        imageCard: ['flex', 'flex-col', 'items-center'],
        image: ['aspect-square', 'm-auto', 'w-full'],
        info: ['flex', 'flex-col', 'mt-4'],
        priceBox: ['py-2', 'font-semibold', 'flex', 'flex-row', 'items-center', 'gap-2', 'w-full', 'justify-between'],
        salePrice: ['text-price'],
        referencePrice: ['text-sm', 'line-through', 'text-reference-price'],
        name: ['line-clamp-2', 'h-10', 'mb-2', 'text-sm'],
        toolbar: ['flex', 'flex-row', 'justify-between', 'w-full', 'gap-1'],
    },
});

export default productCardStyles;
