import React, { ReactElement } from 'react';
import styles from '@seada.io/core/components/MissingComponent/MissingComponent.styles';
import { IPageComponentProps } from '@seada.io/core/interface';

interface IMissingComponentProps extends IPageComponentProps {}

const MissingComponent: React.FC<IMissingComponentProps> = (props): ReactElement => {
    const { componentType } = props;

    return (
        <div className={styles.MissingComponent}>
            <div className={styles.ErrorTitle}>
                Missing Component:&nbsp;
                <span className={styles.ComponentType}>{componentType}</span>
            </div>
        </div>
    );
};

export default MissingComponent;
