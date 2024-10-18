import styles from '@seada.io/search/page-components/SearchBar/SearchBarItem.styles';
import React from 'react';
import { IQuickSearchResultItem } from '@seada.io/search/interface/quick-search';
import SeadaImage from '@seada.io/foundation-ui/components/SeadaImage';

export interface ISearchBarItem {
    item: IQuickSearchResultItem;
}

const SearchBarItem: React.FC<ISearchBarItem> = ({ item }) => {
    return (
        <div className={styles.ResultItem}>
            <div className={styles.ResultImageContainer}>
                <SeadaImage className={styles.ResultImage} width={200} src={item.imageUrl} alt={item.title} />
            </div>
            <div className={styles.ResultText}>
                <div className={styles.ResultTitle}>{item.title}</div>
                <div className={styles.ResultDescription}>{item.description}</div>
            </div>
        </div>
    );
};

export default SearchBarItem;
