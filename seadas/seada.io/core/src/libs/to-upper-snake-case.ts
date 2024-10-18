const toUpperSnakeCase = (str: string): string => {
    return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1_$2').toUpperCase();
};

export default toUpperSnakeCase;
