import React from 'react';
import VariableInputItem from '@seada.io/core-schema/components/VariableInput/VariableInputItem';
import { Button, Card, CardBody } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';
import { CgAdd, CgCheck, CgTrash } from 'react-icons/cg';
import useVariableInputArrayModel from '@seada.io/core-schema/components/VariableInput/VariableInputArray.model';
import { ISchemaField, ISchemaType } from '@seada.io/core-schema/spi/components/interface';

export type IVariableInputArrayProps = {
    onChange?: (value: string[]) => void;
    className?: string;
    fieldSchema: ISchemaField<ISchemaType<string[]>>;
    data: string[];
    maxItems?: number;
};

const VariableInputArray: React.FC<IVariableInputArrayProps> = (props) => {
    const { t } = useTranslation();
    const { maxItems } = props;
    const {
        data: { data },
        handlers: { handleIdxChange, handleIdxRemove, handleAddNew, handleApply },
    } = useVariableInputArrayModel(props);

    const items = data?.map((item: string, index: number) => {
        return (
            <div className={'flex flex-row gap-1 items-center'} key={index}>
                <div className={'text-xs mr-1 w-4 text-right'}>{index + 1}.</div>
                <VariableInputItem {...props} data={item} onChange={(value) => handleIdxChange(value, index)} />
                <CgTrash
                    onClick={() => handleIdxRemove(index)}
                    className={'w-4 text-gray-400 cursor-pointer'}
                    title={t('schema.variables.remove')}
                />
            </div>
        );
    });

    if (maxItems === 1) {
        return (
            <div className={'flex flex-row gap-1 items-center'}>
                <VariableInputItem {...props} data={data?.[0]} onChange={(value) => handleIdxChange(value, 0)} />
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
    }

    const itemsCount = data?.length ?? 0;

    return (
        <Card>
            <CardBody className={'flex flex-col gap-1'}>
                {items}
                {itemsCount < maxItems && (
                    <div className={'flex flex-row gap-1 items-center'} key={itemsCount}>
                        <div className={'text-xs mr-1 w-4 text-right'}></div>
                        <div className={'w-full flex flex-row gap-2 mt-2'}>
                            <Button
                                color={'primary'}
                                size={'sm'}
                                className={'w-full'}
                                onClick={handleAddNew}
                                startContent={<CgAdd className={'w-4 h-4'} />}
                            >
                                {t('schema.variables.addNew')}
                            </Button>
                            <Button
                                startContent={<CgCheck className={'w-4 h-4'} />}
                                color={'danger'}
                                size={'sm'}
                                className={'w-full'}
                                onClick={handleApply}
                            >
                                {t('schema.variables.apply')}
                            </Button>
                        </div>
                        <div className={'w-4'}></div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
};

export default VariableInputArray;
