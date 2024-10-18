import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';

const useSchemaValueTranslation = () => {
    const { t } = useTranslation();

    return useMemo(
        () => ({
            t: (type: string, value: string) => {
                const key = `schema.${type}.${value}`;
                const translation = t(key);

                if (translation === key) {
                    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                }

                return translation;
            },
        }),
        [t]
    );
};

export default useSchemaValueTranslation;
