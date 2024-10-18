import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import { ISchema, SchemaToProps } from '@seada.io/core-schema/spi/components/interface';
import { ITwBackgroundImageSchemaType } from '@seada.io/core-schema/schema-components/TwBackgroundImage/schema';
import { ITwBackgroundColorSchemaType } from '@seada.io/core-schema/schema-components/TwBackgroundColor/schema';
import { ITwBackgroundOpacitySchemaType } from '@seada.io/core-schema/schema-components/TwBackgroundOpacity/schema';

export type IBoxBackgroundSchema = ISchema<{
    backgroundImage?: ITwBackgroundImageSchemaType;
    overlayColor?: ITwBackgroundColorSchemaType;
    overlayOpacity?: ITwBackgroundOpacitySchemaType;
}>;

export interface IBoxBackgroundProps extends SchemaToProps<IBoxBackgroundSchema> {}

const useTwBoxBackgroundClasses = (props: IBoxBackgroundProps): string => {
    const { backgroundImage, overlayOpacity, overlayColor } = props;

    return useMemo(
        () => twMerge([backgroundImage, overlayOpacity, overlayColor]),
        [backgroundImage, overlayColor, overlayOpacity]
    );
};

export default useTwBoxBackgroundClasses;
