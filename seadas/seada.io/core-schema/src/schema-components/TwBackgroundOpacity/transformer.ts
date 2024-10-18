import getTwResponsiveStyle, { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { ISchemaComponentTransformer } from '@seada.io/core-schema/spi/components/interface';

const transformer: ISchemaComponentTransformer<IResponsiveValue, string> = (value) =>
    getTwResponsiveStyle(value, 'bg-opacity-$');

export default transformer;
