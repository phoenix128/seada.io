import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@seada.io/user/page-components/LoginForm/LoginForm.styles';
import { CgLogIn } from 'react-icons/cg';
import SeadaInput from '@seada.io/foundation-ui/components/SeadaInput';
import SeadaButton from '@seada.io/foundation-ui/components/SeadaButton';

export interface ILoginFormUiProps {
    isLoading: boolean;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const LoginFormUi: React.FC<ILoginFormUiProps> = ({ isLoading, onSubmit }) => {
    const { t } = useTranslation();

    return (
        <form onSubmit={onSubmit} className={styles.Form}>
            <SeadaInput autoComplete={'username'} type="email" name="email" label={t('userUi.login.form.email')} />
            <SeadaInput
                autoComplete={'current-password'}
                type="password"
                name="password"
                label={t('userUi.login.form.password')}
            />

            <SeadaButton type={'submit'} isLoading={isLoading} color={'primary'} startContent={<CgLogIn size={24} />}>
                {isLoading ? t('userUi.login.form.loading') : t('userUi.login.form.login')}
            </SeadaButton>
        </form>
    );
};

export default LoginFormUi;
