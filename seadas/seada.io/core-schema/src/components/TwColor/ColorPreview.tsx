import React from 'react';
import styles from '@seada.io/core-schema/components/TwColor/ColorPreview.module.css';

export interface IColorPreviewProps {
    color: string;
}

const ColorPreview: React.FC<IColorPreviewProps> = ({ color }) => {
    return <div className={styles.ColorPreview} style={{ backgroundColor: color }} />;
};

export default ColorPreview;
