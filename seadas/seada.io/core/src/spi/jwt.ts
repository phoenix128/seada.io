import jwt from 'jsonwebtoken';
import getEnvPath from '@seada.io/core/libs/get-env-path';

/**
 * Sign the data with the JWT secret
 * @param data
 */
export const sign = <TData = object>(data: TData): string => {
    const jwtSecret = '' + getEnvPath<string>('jwtSecret');
    if (!jwtSecret) {
        throw new Error('JWT secret is not defined');
    }

    return jwt.sign(data as string | Buffer | object, jwtSecret);
};

/**
 * Verify the JWT token
 * @param token
 */
export const verify = <TData = object>(token: string): TData => {
    if (!token) return null;

    const jwtSecret = '' + getEnvPath<string>('jwtSecret');
    if (!jwtSecret) {
        throw new Error('JWT secret is not defined');
    }

    return jwt.verify(token, jwtSecret) as TData;
};

/**
 * Read the JWT token without verification
 * @param token
 */
export const readWithoutVerify = <TData = object>(token: string): TData => {
    if (!token) return null;
    return jwt.decode(token) as TData;
};
