const styles = {
    ProductsBrowserScreen: 'fixed w-screen h-screen top-0 left-0 z-50 backdrop-blur-md bg-black bg-opacity-30',
    ProductsBrowser:
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:w-2/3 2xl:w-[1024px] lg:w-2/3 md:w-3/4 w-11/12 h-2/3',
    Header: 'flex justify-between items-center',
    Title: '',
    CloseButton: '',
    OkButton: '',
    Image: '',
    TitleButtons: 'flex-grow-0 flex-shrink flex flex-row gap-3',
    Search: 'mb-4',
    SearchIcon: 'w-6 h-6',
    ProductsGridCard: 'pr-5 rounded-xl pl-2',
    ProductsGrid: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6',
    ProductContainer: 'cursor-pointer relative',
    ProductName: 'text-xs h-12',
    Loading: 'm-auto text-center text-xs w-full',
    LoadingMessage: 'mt-3',
    CheckBox: 'absolute top-3 left-2 z-20',
    NotSelected: 'top-4 left-3',
};

export default styles;
