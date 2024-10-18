import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import { ISchema, SchemaToProps } from '@seada.io/core-schema/spi/components/interface';
import { ITwFlexBasisSchemaType } from '@seada.io/core-schema/schema-components/TwFlexBasis/schema';
import { ITwFlexGrowSchemaType } from '@seada.io/core-schema/schema-components/TwFlexGrow/schema';
import { ITwFlexShrinkSchemaType } from '@seada.io/core-schema/schema-components/TwFlexShrink/schema';

export type IBoxFlexSchema = ISchema<{
    basis?: ITwFlexBasisSchemaType;
    flexGrow?: ITwFlexGrowSchemaType;
    flexShrink?: ITwFlexShrinkSchemaType;
}>;

export interface IBoxFlexProps extends SchemaToProps<IBoxFlexSchema> {}

const useTwFlexClasses = (props: IBoxFlexProps): string => {
    const { basis, flexGrow, flexShrink } = props;

    return useMemo(() => twMerge([basis, flexGrow, flexShrink]), [basis, flexGrow, flexShrink]);
};

export default useTwFlexClasses;
