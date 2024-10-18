import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';
import { ITwTextAlignValues } from '@seada.io/core-schema/schema-components/TwTextAlign/schema';

const transformer: ISchemaComponentTransformer<IResponsiveValue<ITwTextAlignValues>, string> = (value) =>
    getTwResponsiveStyle(value, 'text-$', {
        defaultValue: 'left',
    });

export default transformer;
