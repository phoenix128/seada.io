import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import TwDimensionsWrapper from '@seada.io/core-schema/components/TwDimensionsWrapper/TwDimensionsWrapper';
import '@testing-library/jest-dom';
import { ISchemaComponentProps, ISchemaField } from '@seada.io/core-schema/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';
import { IPageData } from '@seada.io/core/spi/components/interface';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key) => key }),
}));

const MockSchemaComponentWidth: React.FC<ISchemaComponentProps> = ({ data, onChange }) => (
    <input data-testid="dimension-width" value={data as string} onChange={(e) => onChange(e.target.value)} />
);

const MockSchemaComponentHeight: React.FC<ISchemaComponentProps> = ({ data, onChange }) => (
    <input data-testid="dimension-height" value={data as string} onChange={(e) => onChange(e.target.value)} />
);

describe('TwDimensionsWrapper', () => {
    it('should render all the dimensions if unlocked', () => {
        const mockOnChange = jest.fn();
        const mockData = ['value1', 'value2'];
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        expect(getByTestId('dimension-width')).toBeInTheDocument();
        expect(getByTestId('dimension-height')).toBeInTheDocument();
    });

    it('should render one the dimension if locked', () => {
        const mockOnChange = jest.fn();
        const mockData = ['value1', 'value1'];
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId, queryByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0, 1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        expect(getByTestId('dimension-width')).toBeInTheDocument();
        expect(queryByTestId('dimension-height')).toBeNull();
    });

    it('should receive change events', () => {
        const mockOnChange = jest.fn();
        const mockData = ['value1', 'value2'];
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        fireEvent.change(getByTestId('dimension-width'), {
            target: { value: 'new-value1' },
        });
        expect(mockOnChange).toHaveBeenCalledWith(['new-value1', 'value2']);
    });

    it('should handle change events with initial partial data', () => {
        const mockOnChange = jest.fn();
        const mockData = [];
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        fireEvent.change(getByTestId('dimension-width'), {
            target: { value: 'new-value1' },
        });
        expect(mockOnChange).toHaveBeenCalledWith(['new-value1', 'auto']);
    });

    it('should handle change events with undefined dimensions', () => {
        const mockOnChange = jest.fn();
        const mockData = [];
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        fireEvent.change(getByTestId('dimension-height'), {
            target: { value: 'new-value2' },
        });
        expect(mockOnChange).toHaveBeenCalledWith(['auto', 'new-value2']);
    });

    it('should unpack non dimensional value', () => {
        const mockOnChange = jest.fn();
        const mockData = 'value1';
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        expect(getByTestId('dimension-width')).toBeInTheDocument();
        expect(getByTestId('dimension-width')).toHaveValue('value1');
    });

    it('should handle change events with initial non dimensional value', () => {
        const mockOnChange = jest.fn();
        const mockData = 'value1';
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponents={mockSchemaComponents}
            />
        );

        fireEvent.change(getByTestId('dimension-height'), {
            target: { value: 'new-value2' },
        });
        expect(mockOnChange).toHaveBeenCalledWith(['value1', 'new-value2']);
    });

    it('should handle custom default values', () => {
        const mockOnChange = jest.fn();
        const mockData = [];
        const mockSchemaComponents = [
            { label: 'Width', component: MockSchemaComponentWidth },
            { label: 'Height', component: MockSchemaComponentHeight },
        ];

        const { getByTestId } = render(
            <TwDimensionsWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                locks={[
                    {
                        keys: [[0], [1]],
                    },
                ]}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                defaultValue={'custom-default'}
                SchemaComponents={mockSchemaComponents}
            />
        );

        fireEvent.change(getByTestId('dimension-height'), {
            target: { value: 'new-value2' },
        });
        expect(mockOnChange).toHaveBeenCalledWith(['custom-default', 'new-value2']);
    });
});
