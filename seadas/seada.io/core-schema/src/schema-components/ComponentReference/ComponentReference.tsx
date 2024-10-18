import React from 'react';
import { ISchemaComponentProps } from '@seada.io/core-schema/spi/components/interface';
import useComponentReferenceModel from '@seada.io/core-schema/schema-components/ComponentReference/ComponentReference.model';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import getPageComponentSchema from '@seada.io/core-schema/spi/components/get-page-component-schema';
import { useTranslation } from 'react-i18next';
import { IComponentReferenceSchemaType } from '@seada.io/core-schema/schema-components/ComponentReference/schema';

export interface IComponentReferenceOptions {
    requiredProps: string[];
}

export interface IComponentReferenceProps
    extends ISchemaComponentProps<IComponentReferenceSchemaType, IComponentReferenceOptions> {
    className?: string;
}

const ComponentReference: React.FC<IComponentReferenceProps> = (props) => {
    const {
        data: { pageComponents, selectedComponentSchema, selectedComponent },
    } = useComponentReferenceModel(props);
    const { t } = useTranslation();
    const ComponentIcon = selectedComponentSchema?.icon;

    return (
        <Autocomplete
            aria-label={props.fieldSchema.label}
            isClearable={false}
            selectedKey={props.data}
            onSelectionChange={props.onChange}
            className={props.className}
            defaultItems={pageComponents}
            startContent={ComponentIcon && <ComponentIcon size={24} />}
        >
            {pageComponents.map((val) => {
                const schema = getPageComponentSchema(val.type);
                const label = val.label ?? t(schema.title) ?? 'Untitled';

                return (
                    <AutocompleteItem
                        key={val.id}
                        aria-label={label}
                        startContent={<schema.icon className={'text-gray-50'} size={'24'} />}
                    >
                        {label}
                    </AutocompleteItem>
                );
            })}
        </Autocomplete>
    );
};

export default ComponentReference;
