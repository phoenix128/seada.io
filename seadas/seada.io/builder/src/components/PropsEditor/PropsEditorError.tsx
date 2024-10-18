import React from 'react';
import styles from '@seada.io/builder/components/PropsEditor/PropsEditorError.module.css';

interface IErrorComponentProps {
    error: Error;
    value: any;
}

const PropsEditorError: React.FC<IErrorComponentProps> = ({ error, value }) => {
    return (
        <div className={styles.ErrorComponent}>
            <div className={styles.ErrorTitle}>Something went wrong</div>
            <div className={styles.ErrorDescription}>{error.message}</div>
            <div className={styles.DataPayload}>
                <div className={styles.DataPayloadTitle}>Data payload:</div>
                {value && <div>{JSON.stringify(value)}</div>}
                {value === undefined && <div>undefined</div>}
                {value === null && <div>null</div>}
            </div>
        </div>
    );
};

export default PropsEditorError;
