import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ISchemaComponentProps, ISchemaField } from '@seada.io/core-schema/spi/components/interface';
import { IResponsiveValue, IResponsiveValueWithBreakpoints } from '@seada.io/core/spi/tw/get-tw-responsive-style';
import TwBreakpointWrapper, {
    ITwBreakpointsRef,
} from '@seada.io/core-schema/components/TwBreakpointWrapper/TwBreakpointWrapper';
import { IPageData } from '@seada.io/core/spi/components/interface';
import { IPageComponentDefinition } from '@seada.io/core/spi/seada-pages/interface';

let currentBreakpoint = 'default';

jest.mock('react-i18next', () => ({
    useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@seada.io/core-schema/ports/schema/hooks/use-current-tw-breakpoint-port', () => {
    return jest.fn(() => currentBreakpoint);
});

const MockSchemaComponent: React.FC<ISchemaComponentProps> = ({ data, onChange }) => (
    <input data-testid="component" value={data as string} onChange={(e) => onChange(e.target.value)} />
);

describe('TwBreakpointWrapper', () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render the component with correct breakpoint value', () => {
        currentBreakpoint = 'md';

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValueWithBreakpoints = {
            sm: 'value-sm',
            md: 'value-md',
            default: 'value-default',
        };

        const { getByTestId } = render(
            <TwBreakpointWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();
        expect(componentInput.value).toBe('value-md');
    });

    it('should fallback on closest breakpoint on undefined value', () => {
        currentBreakpoint = 'md';

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValueWithBreakpoints = {
            sm: 'value-sm',
            md: undefined,
            default: 'value-default',
        };

        const { getByTestId } = render(
            <TwBreakpointWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();
        expect(componentInput.value).toBe('value-default');
    });

    it('should automatically change breakpoint', () => {
        currentBreakpoint = 'default';

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValueWithBreakpoints = {
            sm: 'value-sm',
            md: 'value-md',
            default: 'value-default',
        };

        const Component: React.FC = () => (
            <TwBreakpointWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const { getByTestId, rerender } = render(<Component />);

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();
        expect(componentInput.value).toBe('value-default');

        currentBreakpoint = 'md';
        rerender(<Component />);
        expect(componentInput.value).toBe('value-md');
    });

    it('should update the correct breakpoint', () => {
        currentBreakpoint = 'md';

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValueWithBreakpoints = {
            sm: 'value-sm',
            md: 'value-md',
            default: 'value-default',
        };

        const Component: React.FC = () => (
            <TwBreakpointWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const { getByTestId, rerender } = render(<Component />);

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();

        fireEvent.change(componentInput, { target: { value: 'new-value' } });
        expect(mockOnChange).toHaveBeenCalledWith({
            sm: 'value-sm',
            md: 'new-value',
            default: 'value-default',
        });
    });

    it('should add a new breakpoint if not defined', () => {
        currentBreakpoint = 'md';

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValueWithBreakpoints = {
            default: 'value-default',
        };

        const Component: React.FC = () => (
            <TwBreakpointWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const { getByTestId, rerender } = render(<Component />);

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();

        fireEvent.change(componentInput, { target: { value: 'new-value' } });
        expect(mockOnChange).toHaveBeenCalledWith({
            md: 'new-value',
            default: 'value-default',
        });
    });

    it('should remove the breakpoint if the reset button is clicked', () => {
        currentBreakpoint = 'md';

        const mockAddButton = jest.fn();
        const ref = React.createRef<ITwBreakpointsRef>();

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValueWithBreakpoints = {
            sm: 'value-sm',
            md: 'value-md',
            default: 'value-default',
        };

        const Component: React.FC = () => (
            <TwBreakpointWrapper
                ref={ref}
                addButton={mockAddButton}
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const { getByTestId, rerender } = render(<Component />);

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();
        expect(mockAddButton).toHaveBeenCalledWith('reset', expect.any(Function));

        act(() => ref.current.resetBreakpoint());

        expect(mockOnChange).toHaveBeenCalledWith({
            sm: 'value-sm',
            default: 'value-default',
        });
    });

    it('should accept non responsive data and presume it is the default breakpoint', () => {
        currentBreakpoint = 'md';

        const mockOnChange = jest.fn();
        const mockData: IResponsiveValue = 'value-default';

        const Component: React.FC = () => (
            <TwBreakpointWrapper
                allProps={{}}
                fieldSchema={{} as ISchemaField}
                pageData={{} as IPageData}
                component={{} as IPageComponentDefinition}
                onChange={mockOnChange}
                data={mockData}
                SchemaComponent={MockSchemaComponent}
            />
        );

        const { getByTestId } = render(<Component />);

        const componentInput = getByTestId('component') as HTMLInputElement;
        expect(componentInput).toBeInTheDocument();
        expect(componentInput.value).toBe('value-default');
    });
});
