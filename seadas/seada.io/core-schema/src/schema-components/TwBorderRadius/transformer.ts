import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';

const transformer: ISchemaComponentTransformer<IResponsiveValue, string> = (value) =>
    getTwResponsiveStyle(
        value,
        [
            ['rounded-$'],
            ['rounded-t-$', 'rounded-b-$'],
            ['rounded-tl-$', 'rounded-tr-$', 'rounded-br-$', 'rounded-bl-$'],
        ],
        {
            defaultValue: '0',
        }
    );

export default transformer;
