import React, { useMemo } from 'react';
import { Select, SelectItem, SelectProps } from '@nextui-org/react';
import { getCountryDataList } from 'countries-list';

export interface ICountryListSelectProps extends Partial<SelectProps> {}

const CountryListSelect: React.FC<ICountryListSelectProps> = (props) => {
    const countries = useMemo(() => getCountryDataList(), []);

    const selectItems = countries.map((country) => <SelectItem key={country.iso2}>{country.name}</SelectItem>);

    return <Select {...props}>{selectItems}</Select>;
};

export default CountryListSelect;
