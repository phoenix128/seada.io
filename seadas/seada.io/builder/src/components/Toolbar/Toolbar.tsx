import React from 'react';
import BreakpointSelector from '@seada.io/builder/components/BreakpointSelector';
import SavePage from '@seada.io/builder/components/SavePage';

const Toolbar: React.FC = () => {
    return (
        <>
            <BreakpointSelector />
            <SavePage />
        </>
    );
};

export default Toolbar;
