export interface IQuickSearchResultGroup {
    title: string;
    items: IQuickSearchResultItem[];
}

export interface IQuickSearchResultItem {
    id: string;
    key: string;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}

export interface IQuickSearchResult {
    results: IQuickSearchResultGroup[];
}
