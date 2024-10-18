import React from 'react';
import styles from '@seada.io/core/components/ErrorComponent/ErrorComponent.styles';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

interface IErrorComponentProps {
    component: IPageComponentDefinition;
    error: Error;
}

const ErrorComponent: React.FC<IErrorComponentProps> = ({ component, error }) => {
    return (
        <div className={styles.ErrorComponent}>
            <div className={styles.ErrorTitle}>
                Something went wrong on <span className={styles.ComponentType}>{component.type}</span>:
            </div>
            <div className={styles.ErrorDescription}>{error.message}</div>
        </div>
    );
};

export default ErrorComponent;
