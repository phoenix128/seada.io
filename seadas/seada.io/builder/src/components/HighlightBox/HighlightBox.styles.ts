const styles = {
    HighlightBox: 'fixed border border-dashed border-blue-400 z-50 transition-all duration-200 ease-in-out',
    Title: '-m-[1px] text-xs absolute -top-6 text-nowrap text-center bg-blue-400 text-white rounded-t-xl px-6 py-1',
    LineTop: 'h-screen w-0.5 bg-blue-300 absolute bottom-full z-50 left-1/2',
    LineBottom: 'h-screen w-0.5 bg-blue-300 absolute top-full z-50 left-1/2',
    LineLeft: 'w-screen h-0.5 bg-blue-300 absolute left-full z-50 top-1/2',
    LineRight: 'w-screen h-0.5 bg-blue-300 absolute right-full z-50 top-1/2',
    Selected: 'border-red-400 bg-opacity-0',
    Highlight: 'border-blue-400 bg-blue-600 bg-opacity-5',
    NoLine: 'hidden',
};

export default styles;
