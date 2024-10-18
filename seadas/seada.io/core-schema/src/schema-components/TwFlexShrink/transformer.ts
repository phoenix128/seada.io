import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';

const transformer: ISchemaComponentTransformer<IResponsiveValue, string> = (value) =>
    getTwResponsiveStyle(value ? '1' : '0', 'shrink-$', {
        defaultValue: '1',
        transform: (value) => {
            return `${value}`.replace('shrink-1', 'shrink');
        },
    });

export default transformer;
