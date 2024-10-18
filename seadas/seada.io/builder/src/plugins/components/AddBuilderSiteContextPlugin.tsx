import { IPluginReactFC } from '@seada.io/core/interface';
import { BuilderSiteContextProvider } from '@seada.io/builder/contexts/BuilderSiteContext/BuilderSiteContext';
import TemplateRender from '@seada.io.source/core/components/TemplateRender/TemplateRender';

const AddBuilderSiteContextPlugin: IPluginReactFC<typeof TemplateRender> = (props) => {
    const { SourceElement } = props;

    return (
        <BuilderSiteContextProvider>
            <SourceElement {...props} />
        </BuilderSiteContextProvider>
    );
};

export default AddBuilderSiteContextPlugin;
