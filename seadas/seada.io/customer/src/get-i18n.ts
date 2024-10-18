import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                customer: {
                    order: {
                        number: 'Order Number',
                        date: 'Date',
                        status: 'Status',
                        total: 'Total',
                        dateFormat: '{{date, datetime}}',
                    },
                    address: {
                        firstName: 'First Name',
                        lastName: 'Last Name',
                        streetAddress1: 'Street address (line 1)',
                        streetAddress2: 'Street address (line 2)',
                        city: 'City',
                        state: 'State',
                        country: 'Country',
                        zip: 'Postal Code',
                        phone: 'Phone',
                        email: 'Email',
                        save: 'Save',
                        cancel: 'Cancel',
                        delete: 'Delete',
                        edit: 'Edit',
                        addNew: 'Add new address',
                        editForm: {
                            title: 'Edit Address',
                            close: 'Close',
                            save: 'Save',
                        },
                        deleteConfirm: {
                            title: 'Delete Address',
                            message: 'Are you sure you want to delete this address?',
                            confirm: 'Delete',
                            cancel: 'Cancel',
                        },
                        saveSuccess: 'Address saved successfully',
                        saveFailed: 'Failed to save address: {{error}}',
                        deleteSuccess: 'Address deleted successfully',
                        deleteFailed: 'Failed to delete address: {{error}}',
                    },
                },
                schema: {
                    customer: {
                        groupTitle: 'Customer',
                        modifyAddresses: {
                            componentTitle: 'Modify Addresses',
                            componentDescription: 'List of customer addresses with modify, delete and add new actions',
                        },
                        ordersTable: {
                            componentTitle: 'Orders Table',
                            componentDescription: 'Table with customer orders',
                        },
                    },
                },
            },
        },
    };
};

export default getI18n;
