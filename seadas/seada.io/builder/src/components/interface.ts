import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IconType } from 'react-icons';

export interface INodeTreeData {
    id: string;
    component: IPageComponentDefinition;
    label: string;
    icon: IconType;
    children?: INodeTreeData[];
    parent?: INodeTreeData;
}
