const styles = {
    Wrapper: 'text-sm flex flex-col gap-2',
    OptionWrapper: 'text-sm',
    OptionTitle: 'font-semibold mb-1',
    RectangleOptions: 'flex flex-row items-center gap-1 h-8',
    SwatchOptions: 'flex flex-row items-center gap-1 h-8',
    SwatchOptionValue: 'h-full w-8 flex flex-row hover:scale-150 hover:z-10 hover:shadow-md hover:shadow-gray-500',
    SwatchOptionColor: 'h-full w-full',
    RectangleOptionValue:
        'border border-gray-300 text-center text-xs p-2 cursor-pointer bg-white hover:scale-150 hover:z-10 hover:shadow-md hover:shadow-gray-500',
    Selected: 'border-2 border-black',
    Disabled: 'relative opacity-50 cursor-not-allowed hover:scale-100 hover:shadow-none denied-option',
};

export default styles;
