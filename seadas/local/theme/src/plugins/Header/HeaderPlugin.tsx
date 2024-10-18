import { IPluginReactFC } from '@seada.io/core/interface';
import Header from '@seada.io.source/basic-ui/page-components/Header/Header';

const HeaderPlugin: IPluginReactFC<typeof Header, 100> = (props) => {
    const { SourceElement } = props;

    return <SourceElement {...props} />;
};

export default HeaderPlugin;
