import React from 'react';
import { Spinner } from '@nextui-org/react';

const PageLoaderOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-95">
            <div className="flex items-center justify-center space-x-2">
                <Spinner size="lg" />
            </div>
        </div>
    );
};

export default PageLoaderOverlay;
