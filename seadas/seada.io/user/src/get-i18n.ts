import { ITranslationResourceProvider } from '@seada.io/core/interface';
import { Resource } from 'i18next/typescript/options';

const getI18n: ITranslationResourceProvider = (): Resource => {
    return {
        en: {
            translation: {
                schema: {
                    userUi: {
                        groupTitle: 'User',
                        userIcon: {
                            componentTitle: 'User Icon',
                            componentDescription: 'User icon component with login and logout buttons',
                        },
                        loginForm: {
                            componentTitle: 'Login Form',
                            componentDescription: 'Login form component with email and password fields',
                            behaviour: {
                                groupTitle: 'Behaviour',
                                loginRedirect: 'Redirect after login',
                                loginRedirectOptions: {
                                    none: 'Remain on same page',
                                    home: 'Go to Home',
                                    account: 'Go to Personal Area',
                                },
                            },
                        },
                        modifyUserData: {
                            componentTitle: 'Modify User Data',
                            componentDescription: 'Modify user data form',
                            myGroup: {
                                groupTitle: 'My Group',
                                myProperty: 'My Property',
                            },
                        },
                    },
                },
                userUi: {
                    login: {
                        form: {
                            email: 'Email',
                            password: 'Password',
                            loading: 'Loading...',
                            login: 'Login',
                        },
                        loginFailed: 'Invalid email or password',
                        loginSuccess: 'You successfully logged in',
                    },
                    modifyUserData: {
                        form: {
                            firstName: 'First Name',
                            lastName: 'Last Name',
                            loading: 'Loading...',
                            update: 'Update your information',
                        },
                        updateFailed: 'Failed to update user data: {{error}}',
                        updateSuccess: 'User data updated successfully',
                    },
                },
            },
        },
    };
};

export default getI18n;
