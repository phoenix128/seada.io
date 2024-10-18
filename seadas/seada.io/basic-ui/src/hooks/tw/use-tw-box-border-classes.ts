import { twMerge } from 'tailwind-merge';
import { useMemo } from 'react';
import { ISchema, SchemaToProps } from '@seada.io/core-schema/spi/components/interface';
import { ITwBorderRadiusSchemaType } from '@seada.io/core-schema/schema-components/TwBorderRadius/schema';
import { ITwBorderWidthSchemaType } from '@seada.io/core-schema/schema-components/TwBorderWidth/schema';
import { ITwBorderStyleSchemaType } from '@seada.io/core-schema/schema-components/TwBorderStyle/schema';
import { ITwBorderColorSchemaType } from '@seada.io/core-schema/schema-components/TwBorderColor/schema';

export type IBoxBordersSchema = ISchema<{
    borderRadius?: ITwBorderRadiusSchemaType;
    borderWidth?: ITwBorderWidthSchemaType;
    borderStyle?: ITwBorderStyleSchemaType;
    borderColor?: ITwBorderColorSchemaType;
}>;

export interface IBoxBordersProps extends SchemaToProps<IBoxBordersSchema> {}

const useTwBoxBorderClasses = (props: IBoxBordersProps): string => {
    const { borderRadius, borderWidth, borderStyle, borderColor } = props;
    return useMemo(
        () => twMerge(borderRadius, borderWidth, borderStyle, borderColor),
        [borderColor, borderRadius, borderStyle, borderWidth]
    );
};

export default useTwBoxBorderClasses;
