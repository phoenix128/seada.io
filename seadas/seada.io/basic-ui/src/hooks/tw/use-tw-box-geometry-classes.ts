import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import { ISchema, SchemaToProps } from '@seada.io/core-schema/spi/components/interface';
import { ITwSizeDimensionsSchemaType } from '@seada.io/core-schema/schema-components/TwSizeDimensions/schema';
import { ITwMarginSchemaType } from '@seada.io/core-schema/schema-components/TwMargin/schema';
import { ITwPaddingSchemaType } from '@seada.io/core-schema/schema-components/TwPadding/schema';
import { ITwMaxSizeDimensionsSchemaType } from '@seada.io/core-schema/schema-components/TwMaxSizeDimensions/schema';
import { ITwMinSizeDimensionsSchemaType } from '@seada.io/core-schema/schema-components/TwMinSizeDimensions/schema';
import { ITwAspectRatioSchemaType } from '@seada.io/core-schema/schema-components/TwAspectRatio/schema';

export type IBoxGeometrySchema = ISchema<{
    size?: ITwSizeDimensionsSchemaType;
    margin?: ITwMarginSchemaType;
    padding?: ITwPaddingSchemaType;
    maxSize?: ITwMaxSizeDimensionsSchemaType;
    minSize?: ITwMinSizeDimensionsSchemaType;
    aspectRatio?: ITwAspectRatioSchemaType;
}>;

export interface IBoxGeometryProps extends SchemaToProps<IBoxGeometrySchema> {}

const useTwBoxGeometryClasses = (props: IBoxGeometryProps): string => {
    const { size, margin, padding, maxSize, minSize, aspectRatio } = props;

    return useMemo(
        () => twMerge([size, margin, padding, maxSize, minSize, aspectRatio]),
        [aspectRatio, margin, maxSize, minSize, padding, size]
    );
};

export default useTwBoxGeometryClasses;
