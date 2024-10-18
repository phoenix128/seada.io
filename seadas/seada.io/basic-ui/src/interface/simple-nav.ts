export interface ISimpleNavLink {
    node: ISimpleNavNode;
}

export interface ISimpleNavNode {
    id: string;
    name: string;
    url: string;
    children?: ISimpleNavNode[];
}

export interface INavBarData {
    nodesTree: ISimpleNavNode[];
}
