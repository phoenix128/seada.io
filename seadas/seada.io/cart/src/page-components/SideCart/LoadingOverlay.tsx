import React from 'react';
import SeadaSpinner from '@seada.io/foundation-ui/components/SeadaSpinner';

export interface ILoadingOverlayProps {
    className?: string;
}

const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({ className }) => {
    return (
        <div className={className}>
            <SeadaSpinner />
        </div>
    );
};

export default LoadingOverlay;
