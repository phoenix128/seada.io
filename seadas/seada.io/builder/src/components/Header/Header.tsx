import React from 'react';
import { useTranslation } from 'react-i18next';
import Toolbar from '@seada.io/builder/components/Toolbar';

const Header: React.FC = () => {
    const { t } = useTranslation();

    return (
        <div
            className={
                'text-white w-full h-16 px-6 flex items-center text-lg font-bold bg-gradient-to-r from-blue-900 to-gray-900'
            }
        >
            <div className={'w-56'}>{t('builder.title')}</div>
            <div className={'flex flex-row w-full gap-4 justify-end'}>
                <Toolbar />
            </div>
        </div>
    );
};

export default Header;
