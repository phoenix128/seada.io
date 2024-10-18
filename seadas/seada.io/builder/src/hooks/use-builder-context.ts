import { useContext } from 'react';
import BuilderContext from '@seada.io/builder/contexts/BuilderContext';

const useBuilderContext = () => useContext(BuilderContext);

export default useBuilderContext;
