import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { IResponsiveSchemaComponentProps, ISchemaType } from '@seada.io/core-schema/spi/components/interface';
import { Switch } from '@nextui-org/react';
import TwNumericSize from '@seada.io/core-schema/components/TwNumericSize';
import TwRelativeSize from '@seada.io/core-schema/components/TwRelativeSize';
import styles from '@seada.io/core-schema/components/TwSize/TwSize.module.css';
import { CgMathPercent, CgSelect } from 'react-icons/cg';
import { ITwNumericValueOptions } from '@seada.io/core-schema/components/TwNumericSize/TwNumericSize';
import getIdxFromTwRelativeSize from '@seada.io/core-schema/service/tw/size/get-idx-from-tw-relative-size';

export enum ETwSizeMode {
    NUMERIC = 'numeric',
    RELATIVE = 'relative',
}

export interface ITwSizeOptions {
    defaultMode: ETwSizeMode;
}

export interface ITwSizeProps
    extends IResponsiveSchemaComponentProps<ISchemaType<string>, ITwSizeOptions & ITwNumericValueOptions> {}

const isNumeric = (n: any): boolean => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const TwSize: React.FC<ITwSizeProps> = (props) => {
    const { data, onChange, fieldSchema: { options: { defaultMode = ETwSizeMode.NUMERIC } = {} } = {} } = props;

    const isAutoValue = data === null || data === undefined || data === 'auto';

    const relativeValue = useMemo(() => getIdxFromTwRelativeSize(data?.toString()), [data]);

    const isNumericSize = isAutoValue ? defaultMode === ETwSizeMode.NUMERIC : relativeValue === -1;
    const [numericMode, setNumericMode] = useState(isNumericSize);

    useEffect(() => {
        setNumericMode(isNumericSize);
    }, [isNumericSize]);

    const handleModeChange = useCallback(
        (evt: ChangeEvent<HTMLInputElement>) => {
            setNumericMode(!evt.target.checked);
            onChange('auto');
        },
        [onChange]
    );

    return (
        <div className={styles.Wrapper}>
            <div className={styles.RelativeSwitch}>
                <Switch
                    size="sm"
                    onChange={handleModeChange}
                    isSelected={!numericMode}
                    startContent={<CgMathPercent size={14} />}
                    endContent={<CgSelect size={14} />}
                />
            </div>
            <div className={styles.Dimension}>
                {numericMode && <TwNumericSize {...props} data={props.data} />}
                {!numericMode && <TwRelativeSize {...props} />}
            </div>
        </div>
    );
};

export default TwSize;
