import { IPageComponentPropsMiddleware } from '@seada.io/core/spi/components/interface';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import getSchemaComponentTransformers from '@seada.io/core-schema/spi/components/get-schema-component-transformers';

const transformProperties: IPageComponentPropsMiddleware = (component, props, pageData) => {
    const res: Record<string, any> = props;
    const schema = getPageComponentSchema(component.type);
    const transformers = getSchemaComponentTransformers();

    for (const fieldGroup of Object.values(schema.fields)) {
        for (const [fieldName, fieldData] of Object.entries(fieldGroup.fields)) {
            if (!transformers.hasOwnProperty(fieldData.type)) {
                res[fieldName] = props?.[fieldName];
                continue;
            }

            const transformer = transformers[fieldData.type];
            res[fieldName] = transformer(props?.[fieldName]);
        }
    }

    return res;
};

export default transformProperties;
