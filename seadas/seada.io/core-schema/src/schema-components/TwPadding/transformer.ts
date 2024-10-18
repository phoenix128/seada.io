import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';

const transformer: ISchemaComponentTransformer<IResponsiveValue, string> = (value) =>
    getTwResponsiveStyle(value, [['p-$'], ['p-y-$', 'p-x-$'], ['p-t-$', 'p-r-$', 'p-b-$', 'p-l-$']], {
        defaultValue: 0,
    });

export default transformer;
