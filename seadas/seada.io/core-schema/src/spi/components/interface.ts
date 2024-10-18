import React from 'react';
import type { IconType } from 'react-icons';
import { Definition } from 'typescript-json-schema';
import { ESchemaComponent } from '@seada.io/core-schema/spi/schema/components-list.generated';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IResponsiveValue } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import { IValueType } from '@seada.io/core/spi/tw/get-tw-classes';
import { IPageComponentProps, IPageComponentPropsWithDataProvider } from '@seada.io/core/interface';
import { ILocalizableValue } from '@seada.io/core/spi/get-localizable-value';

export interface IResponsiveSchemaComponentProps<
    TSchemaType extends ISchemaTypes = ISchemaTypes,
    TSchemaOptions = {
        [key: string]: any;
    }
> {
    fieldSchema: ISchemaField<TSchemaType, TSchemaOptions>;
    allProps: Record<string, any>;
    disabled?: boolean;
    data: ISchemaTypeInput<TSchemaType>;
    className?: string;
    onChange?: (data: ISchemaTypeInput<TSchemaType>) => void;
    addButton?: (key: string, component: React.FC) => void;
    removeButton?: (key: string) => void;

    placeholder?: ISchemaTypeInput<TSchemaType>;
    pageData: IPageData;
    component: IPageComponentDefinition;
}

export interface ISchemaComponentProps<
    TSchemaType extends ISchemaTypes = ISchemaTypes,
    TSchemaOptions = {
        [key: string]: any;
    }
> extends IResponsiveSchemaComponentProps<IResolvedResponsiveSchemaType<TSchemaType>, TSchemaOptions> {}

export interface IPageComponentSchema<TSchema extends ISchema = ISchema> {
    title: string;
    description: string;
    icon: IconType;
    group: string;
    maxChildren: number;
    fields?: { [key: string]: ISchemaFieldsGroup<Partial<TSchema>> };
}

export interface ISchemaComponentsCollection {
    [key: string]: React.FC<IResponsiveSchemaComponentProps>;
}

export interface ISchemaComponentsSchemaCollection {
    [key: string]: Definition;
}

export interface ISchemaFieldsGroup<TSchema extends ISchema = ISchema> {
    title: string;
    sort?: number;
    icon?: IconType;
    fields: { [K in keyof TSchema]: ISchemaField<TSchema[K]> };
}

export type ISchema<TSource = Record<string, ISchemaTypes>> = {
    [K in keyof TSource]: TSource[K] extends ISchemaTypes ? TSource[K] : never;
};

export interface ISchemaType<TInput = IValueType | IValueType[], TOutput = TInput> {
    type: ESchemaComponent;

    // Just placeholders for the actual types
    inputType?: TInput;
    outputType?: TOutput;
}

export type ISchemaTypeInput<TSchemaType extends ISchemaTypes> = TSchemaType extends ISchemaTypes<infer TInput, any>
    ? TInput
    : never;

export type ISchemaTypeOutput<TSchemaType extends ISchemaTypes> = TSchemaType extends ISchemaTypes<any, infer TOutput>
    ? TOutput
    : never;

export type ISchemaTypes<TInput = IValueType | IValueType[], TOutput = TInput> =
    | ISchemaType<TInput, TOutput>
    | IResponsiveSchemaType<TInput, TOutput>
    | ILocalizableSchemaType<TInput, TOutput>;

export interface IResponsiveSchemaType<TInput = IValueType | IValueType[], TOutput = TInput> {
    type: ESchemaComponent;
    inputType?: IResponsiveValue<TInput>;
    outputType?: TOutput;
}

export interface ILocalizableSchemaType<TInput = IValueType | IValueType[], TOutput = TInput> {
    type: ESchemaComponent;
    inputType?: ILocalizableValue<TInput>;
    outputType?: TOutput;
}

export interface IResolvedResponsiveSchemaType<TSchema extends IResponsiveSchemaType = IResponsiveSchemaType> {
    type: ESchemaComponent;
    inputType?: TSchema extends IResponsiveSchemaType<infer TInput, any> ? TInput : never;
    outputType?: TSchema extends IResponsiveSchemaType<any, infer TOutput> ? TOutput : never;
}

export interface ISchemaField<
    TSchemaType extends ISchemaTypes = ISchemaTypes,
    TSchemaOptions = {
        [key: string]: any;
    }
> {
    label: string;
    type: TSchemaType['type'];
    responsive?: boolean;
    localizable?: boolean;
    options?: TSchemaOptions;
    advanced?: boolean;
    defaultValue?: ISchemaTypeInput<TSchemaType>;
}

export interface IPageComponentSchemaCollection {
    [key: string]: IPageComponentSchema;
}

export type SchemaToProps<TSchema extends ISchema> = {
    [K in keyof TSchema]: ISchemaTypeOutput<TSchema[K]>;
};

export interface ISchemaComponentTransformerCollection {
    [key: string]: ISchemaComponentTransformer;
}

export interface ISchemaComponentTransformer<TSource = IResponsiveValue, TOutput = string[]> {
    (value: TSource): TOutput;
}

export type IValidationSchemaType = Definition;

export type IPageComponentSchemaProps<TSchema extends ISchema = ISchema> = IPageComponentProps<SchemaToProps<TSchema>>;

export type IPageComponentSchemaPropsWithDataProvider<
    TSchema extends ISchema = ISchema,
    TProvidersData extends Record<string, any> = Record<string, any>
> = IPageComponentPropsWithDataProvider<SchemaToProps<TSchema>, TProvidersData>;
