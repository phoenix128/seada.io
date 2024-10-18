import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                builder: {
                    title: 'Seada.io Studio',
                    props: {
                        loading: 'Updating page...',
                        advancedMode: 'Show Advanced Options',
                        source: 'Source',
                        search: 'Search Field',
                        inheritSource: 'Use Page Source',
                    },
                    variantModal: {
                        create: 'Create Variant',
                        cancel: 'Cancel',
                    },
                    page: {
                        go: 'Go',
                        size: 'Page Size',
                        path: 'Path',
                        save: 'Save',
                        saved: 'Saved',
                        type: {
                            default: '{{type}} / Default Page',
                            select: 'Page Type',
                            new: 'New Page Variant',
                        },
                        layout: {
                            default: 'Default Layout',
                            select: 'Page Layout',
                        },
                    },
                    addNewComponent: {
                        title: 'Add New Component',
                        select: 'Select Component',
                    },
                    tree: {
                        content: 'Content',
                        layout: 'Layout',
                        'add-new': 'Add New',
                        'remove-item': 'Remove Item',
                    },
                    breakpointSelector: 'Breakpoint',
                    breakpoints: {
                        xs: 'Small Mobile',
                        sm: 'Mobile',
                        md: 'Tablet',
                        lg: 'Desktop',
                        xl: 'Large',
                        '2xl': 'Extra Large',
                        default: 'Max size',
                    },
                },
            },
        },
    };
};

export default getI18n;
