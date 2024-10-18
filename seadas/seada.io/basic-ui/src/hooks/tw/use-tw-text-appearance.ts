import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ISchema, SchemaToProps } from '@seada.io/core-schema/spi/components/interface';
import { ITwLeadingSchemaType } from '@seada.io/core-schema/schema-components/TwLeading/schema';
import { ITwFontSizeSchemaType } from '@seada.io/core-schema/schema-components/TwFontSize/schema';
import { ITwTextAlignSchemaType } from '@seada.io/core-schema/schema-components/TwTextAlign/schema';
import { ITwTextColorSchemaType } from '@seada.io/core-schema/schema-components/TwTextColor/schema';
import { ITwFontWeightSchemaType } from '@seada.io/core-schema/schema-components/TwFontWeight/schema';
import { ITwFontStyleSchemaType } from '@seada.io/core-schema/schema-components/TwFontStyle/schema';
import { ITwLetterSpacingSchemaType } from '@seada.io/core-schema/schema-components/TwLetterSpacing/schema';
import { ITwTextDecorationSchemaType } from '@seada.io/core-schema/schema-components/TwTextDecoration/schema';
import { ITwTextDecorationColorSchemaType } from '@seada.io/core-schema/schema-components/TwTextDecorationColor/schema';

export type ITextAppearanceSchema = ISchema<{
    leading?: ITwLeadingSchemaType;
    fontSize?: ITwFontSizeSchemaType;
    textAlign?: ITwTextAlignSchemaType;
    textColor?: ITwTextColorSchemaType;
    fontWeight?: ITwFontWeightSchemaType;
    fontStyle?: ITwFontStyleSchemaType;
    letterSpacing?: ITwLetterSpacingSchemaType;
    textDecoration?: ITwTextDecorationSchemaType;
    textDecorationColor?: ITwTextDecorationColorSchemaType;
}>;

export interface ITextAppearanceProps extends SchemaToProps<ITextAppearanceSchema> {}

const useTwTextAppearance = (props: ITextAppearanceProps): string => {
    const {
        textAlign,
        fontSize,
        textColor,
        fontWeight,
        fontStyle,
        letterSpacing,
        leading,
        textDecoration,
        textDecorationColor,
    } = props;

    return useMemo(
        () =>
            twMerge([
                textAlign,
                fontSize,
                textColor,
                fontWeight,
                fontStyle,
                letterSpacing,
                leading,
                textDecoration,
                textDecorationColor,
            ]),
        [
            fontSize,
            fontStyle,
            fontWeight,
            leading,
            letterSpacing,
            textAlign,
            textColor,
            textDecoration,
            textDecorationColor,
        ]
    );
};

export default useTwTextAppearance;
