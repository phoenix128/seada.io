import { useContext } from 'react';
import { NestableDataContext } from '@seada.io/core/components/NestableDataContext/NestableDataContext';

const useDataContext = () => useContext(NestableDataContext);

export default useDataContext;
