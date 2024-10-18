import { IPluginReactFC } from '@seada.io/core/interface';
import AddToCart from '@seada.io.source/cart/page-components/AddToCart/AddToCart';

const AddToCartPlugin: IPluginReactFC<typeof AddToCart, 100> = ({ SourceElement, ...props }) => {
    return <SourceElement {...props} />;
};

export default AddToCartPlugin;
