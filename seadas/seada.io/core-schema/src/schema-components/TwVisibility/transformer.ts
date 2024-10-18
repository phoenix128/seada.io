import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';
import { ITwVisibilityValues } from '@seada.io/core-schema/schema-components/TwVisibility/schema';

const transformer: ISchemaComponentTransformer<IResponsiveValue<ITwVisibilityValues>, string> = (value) =>
    getTwResponsiveStyle(value, '$', {
        defaultValue: 'visible',
    });

export default transformer;
