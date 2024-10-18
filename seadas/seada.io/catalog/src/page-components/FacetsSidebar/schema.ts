import BoxSchema, { IBoxSchema } from '@seada.io/basic-ui/page-components/Box/schema';
import { IPageComponentSchema, ISchema } from '@seada.io/core-schema/spi/components/interface';
import { CgScreenWide, CgSidebar } from 'react-icons/cg';
import { IMobileModeSchemaType } from '@seada.io/core-schema/schema-components/MobileMode/schema';

export type IAppearanceSchema = ISchema<{
    mobileMode?: IMobileModeSchemaType;
}>;

export type IFacetsSidebarSchema = IBoxSchema & IAppearanceSchema;

const Schema: IPageComponentSchema<IFacetsSidebarSchema> = {
    title: 'schema.commerce.facetsSidebar.componentTitle',
    description: 'schema.commerce.facetsSidebar.componentDescription',
    group: 'schema.commerce.productsList.groupTitle',
    maxChildren: 0,
    icon: CgSidebar,
    fields: {
        appearance: {
            title: 'schema.commerce.facetsSidebar.appearance.groupTitle',
            icon: CgScreenWide,
            fields: {
                mobileMode: {
                    label: 'schema.commerce.facetsSidebar.appearance.mobileMode',
                    type: '@seada.io/core-schema/MobileMode',
                    defaultValue: {
                        default: false,
                        sm: true,
                    },
                    responsive: true,
                },
            },
        },
        ...BoxSchema.fields,
    },
};

export default Schema;
