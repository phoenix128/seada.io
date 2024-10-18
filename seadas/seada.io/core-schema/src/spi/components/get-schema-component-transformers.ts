import { ISchemaComponentTransformerCollection } from '@seada.io/core-schema/spi/components/interface';

const getSchemaComponentTransformers = (
    transformers?: ISchemaComponentTransformerCollection
): ISchemaComponentTransformerCollection => {
    return transformers;
};

export default getSchemaComponentTransformers;
