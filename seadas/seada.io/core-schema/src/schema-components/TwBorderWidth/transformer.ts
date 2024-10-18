import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';

const transformer: ISchemaComponentTransformer<IResponsiveValue, string> = (value) =>
    getTwResponsiveStyle(
        value,
        [['border-$'], ['border-y-$', 'border-x-$'], ['border-t-$', 'border-r-$', 'border-b-$', 'border-l-$']],
        {
            defaultValue: '0',
            transform: (value) => {
                return `${value}`.replace(/^border(-\w)?-1$/, 'border$1');
            },
        }
    );

export default transformer;
