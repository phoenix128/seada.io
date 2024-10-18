import React from 'react';

export interface IFlagProps {
    locale: string;
    className?: string;
}

const Flag: React.FC<IFlagProps> = ({ locale, className }) => {
    const countryCode = locale.split('_')[1].toLowerCase();

    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`https://flagcdn.com/w20/${countryCode}.png`} className={className} alt={locale} />;
};

export default Flag;
