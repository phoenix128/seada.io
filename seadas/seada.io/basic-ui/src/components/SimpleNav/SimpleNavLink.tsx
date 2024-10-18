import React from 'react';
import SeadaLink from '@seada.io/core/components/SeadaLink';
import { ISimpleNavNode } from '@seada.io/basic-ui/interface/simple-nav';
import useTwTextAppearance from '@seada.io/basic-ui/hooks/tw/use-tw-text-appearance';

export interface ISimpleNavLinkProps {
    node: ISimpleNavNode;
    fontSize: string;
}

const SimpleNavLink: React.FC<ISimpleNavLinkProps> = (props) => {
    const {
        node: { url, name },
    } = props;
    const textClasses = useTwTextAppearance(props);

    if (!url) return <span>{name}</span>;

    return (
        <SeadaLink path={url}>
            <span className={textClasses}>{name}</span>
        </SeadaLink>
    );
};

export default SimpleNavLink;
