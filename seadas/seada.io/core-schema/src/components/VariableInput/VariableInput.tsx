import React from 'react';
import VariableInputItem from '@seada.io/core-schema/components/VariableInput/VariableInputItem';
import { Button } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { CgCheck } from 'react-icons/cg';
import useVariableInputModel from '@seada.io/core-schema/components/VariableInput/VariableInput.model';
import { ISchemaField, ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export type IVariableInputProps = {
    onChange?: (value: string) => void;
    className?: string;
    fieldSchema: ISchemaField<ISchemaType<string>>;
    data: string;
};

const VariableInput: React.FC<IVariableInputProps> = (props) => {
    const { t } = useTranslation();
    const {
        data: { data },
        handlers: { handleChange, handleApply },
    } = useVariableInputModel(props);

    return (
        <div className={'flex flex-row gap-1 items-center'}>
            <VariableInputItem {...props} data={data} onChange={handleChange} />
            <Button
                color={'danger'}
                size={'sm'}
                className={'w-8 -ml-4'}
                onClick={handleApply}
                title={t('schema.variables.apply')}
            >
                <CgCheck className={'w-6 h-6'} />
            </Button>
        </div>
    );
};

export default VariableInput;
