import { IPluginReactFC } from '@seada.io/core/interface';
import CopilotInput from '@seada.io/builder-copilot/components/CopilotInput/CopilotInput';
import Toolbar from '@seada.io.source/builder/components/Toolbar/Toolbar';

const AddCopilotPlugin: IPluginReactFC<typeof Toolbar> = ({ SourceElement, ...props }) => {
    return (
        <>
            <CopilotInput />
            <SourceElement {...props} />
        </>
    );
};

export default AddCopilotPlugin;
