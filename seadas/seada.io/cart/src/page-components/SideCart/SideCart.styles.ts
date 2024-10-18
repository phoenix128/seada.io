import { tv } from 'tailwind-variants';

const sideCartStyles = tv({
    slots: {
        base: [
            'fixed',
            'top-0',
            'right-0',
            'w-96',
            'h-screen',
            'z-50',
            'transition',
            'duration-300',
            'ease-in-out',
            'bg-white',
            'border-l',
            'border-gray-200',
            'flex',
            'flex-col',
        ],
        wrapper: ['h-full', 'w-full', 'flex', 'flex-col', 'relative'],
        cartItems: ['h-full', 'flex-grow', 'p-4'],
        totals: ['flex-shrink-0', 'border-t', 'border-gray-200', 'p-4'],
        loadingOverlay: ['hidden', 'absolute', 'top-0', 'h-screen', 'w-full', 'z-60', 'bg-gray-50', 'p-4'],
        checkoutButton: ['m-4'],
    },
    variants: {
        isOpen: {
            true: { base: ['translate-x-0', 'shadow-xl'] },
            false: { base: ['translate-x-96', 'shadow-none'] },
        },
        isLoading: {
            true: {
                loadingOverlay: ['block', 'animate-pulse'],
                checkoutButton: ['hidden'],
            },
            false: { base: [] },
        },
    },
});

export default sideCartStyles;
