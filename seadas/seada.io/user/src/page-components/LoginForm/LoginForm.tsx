'use client';

import Box from '@seada.io/basic-ui/page-components/Box';
import useAreaPath from '@seada.io/core/hooks/use-area-path';
import useToast from '@seada.io/core/hooks/use-toast';
import useLogin from '@seada.io/user/hooks/use-login';
import LoginFormUi from '@seada.io/user/page-components/LoginForm/LoginFormUi';
import { ELoginRedirect, ILoginFormSchema } from '@seada.io/user/page-components/LoginForm/schema';
import useGetPersonalAreaUrlPort from '@seada.io/user/ports/user/hooks/use-get-personal-area-url-port';
import React, { FormEvent, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useAsyncActionResult from '@seada.io/core/hooks/use-async-action-result';
import useGoToUrl from '@seada.io/core/hooks/use-go-to-url';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const LoginForm: React.FC<IPageComponentSchemaProps<ILoginFormSchema>> = (props) => {
    const loginAction = useLogin();
    const { action: login, loading } = loginAction;
    const toast = useToast();
    const { t } = useTranslation();
    const getPersonalAreaUrl = useGetPersonalAreaUrlPort();
    const homeUrl = useAreaPath('/');
    const gotoUrl = useGoToUrl();

    const handleSubmit = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            (async () => {
                try {
                    const formData = new FormData(event.currentTarget);
                    login(formData.get('email') as string, formData.get('password') as string);
                } catch (error) {
                    console.error(error);
                }
            })();
        },
        [login]
    );

    const onLoginSuccess = useCallback(() => {
        switch (props.redirect) {
            case ELoginRedirect.Home:
                gotoUrl(homeUrl);
                break;
            case ELoginRedirect.Account:
                gotoUrl(getPersonalAreaUrl());
                break;
        }

        toast(t('userUi.login.loginSuccess'), { type: 'success' });
    }, [getPersonalAreaUrl, gotoUrl, homeUrl, props.redirect, t, toast]);

    useAsyncActionResult(loginAction, onLoginSuccess, t('userUi.login.loginFailed'));

    return (
        <Box {...props}>
            <LoginFormUi onSubmit={handleSubmit} isLoading={loading} />
        </Box>
    );
};

export default LoginForm;
