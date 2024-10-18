import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

const removeEmptyChildren = (components: IPageComponentDefinition[]): IPageComponentDefinition[] => {
    const newComponents = JSON.parse(JSON.stringify(components));

    for (const component of newComponents) {
        if (component.children?.length) {
            component.children = removeEmptyChildren(component.children);
        } else {
            delete component.children;
        }
    }

    return newComponents;
};

export default removeEmptyChildren;
