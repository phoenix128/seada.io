import useBuilderContext from '@seada.io/builder/hooks/use-builder-context';

const useIsAdvancedMode = () => {
    const { advancedMode } = useBuilderContext();
    return advancedMode;
};

export default useIsAdvancedMode;
