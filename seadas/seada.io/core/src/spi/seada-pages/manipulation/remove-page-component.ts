import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

const removePageComponent = (page: IPageData, componentId: string): IPageData => {
    const newPage = JSON.parse(JSON.stringify(page)) as IPageData;

    const findAndRemove = (components: IPageComponentDefinition[]) => {
        for (let i = 0; i < components.length; i++) {
            const component = components[i];

            if (component.id === componentId) {
                components.splice(i, 1);
                return;
            }

            if (component.children) {
                findAndRemove(component.children);
            }
        }
    };

    findAndRemove(newPage.pageLayout.components);
    findAndRemove(newPage.pageTemplate.components);

    return newPage;
};

export default removePageComponent;
