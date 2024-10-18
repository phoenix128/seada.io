import { useSearchParams } from 'next/navigation';

const useSeadaSearchParams = (): Record<string, string | string[]> => {
    const searchParams = useSearchParams();
    const result = {};

    for (const [key, value] of searchParams) {
        if (result.hasOwnProperty(key)) {
            const existingValue = result[key];
            if (Array.isArray(existingValue)) {
                result[key] = [...existingValue, value];
            } else {
                result[key] = [existingValue, value];
            }
            continue;
        }

        result[key] = value;
    }

    return result;
};

export default useSeadaSearchParams;
