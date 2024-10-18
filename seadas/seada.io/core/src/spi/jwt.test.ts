import jwt from 'jsonwebtoken';
import getEnvPath from '@seada.io/core/libs/get-env-path';
import { readWithoutVerify, sign, verify } from '@seada.io/core/spi/jwt';

jest.mock('@seada.io/core/libs/get-env-path');

describe('jwt', () => {
    const jwtSecret = 'testsecret';
    const payload = { foo: 'bar' };

    beforeEach(() => {
        (getEnvPath as jest.Mock).mockReturnValue(jwtSecret);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('sign', () => {
        it('should sign the data with the JWT secret', () => {
            const token = sign(payload);
            const decoded = jwt.verify(token, jwtSecret);

            expect(decoded).toMatchObject(payload);
        });

        it('should throw an error if JWT secret is not defined', () => {
            (getEnvPath as jest.Mock).mockReturnValueOnce('');

            expect(() => sign(payload)).toThrow('JWT secret is not defined');
        });
    });

    describe('verify', () => {
        it('should verify the JWT token and return the decoded data', () => {
            const token = jwt.sign(payload, jwtSecret);
            const decoded = verify(token);

            expect(decoded).toMatchObject(payload);
        });

        it('should return null if the token is not provided', () => {
            const decoded = verify('');

            expect(decoded).toBeNull();
        });

        it('should throw an exception if the signature is invalid', () => {
            const token = jwt.sign(payload, 'invalid secret');

            expect(() => verify(token)).toThrow('invalid signature');
        });

        it('should throw an error if JWT secret is not defined', () => {
            (getEnvPath as jest.Mock).mockReturnValueOnce('');
            const token = jwt.sign(payload, jwtSecret);

            expect(() => verify(token)).toThrow('JWT secret is not defined');
        });
    });

    describe('readWithoutVerify', () => {
        it('should decode the JWT token without verification', () => {
            const token = jwt.sign(payload, jwtSecret);
            const decoded = readWithoutVerify(token);

            expect(decoded).toMatchObject(payload);
        });

        it('should return null if the token is not provided', () => {
            const decoded = readWithoutVerify('');

            expect(decoded).toBeNull();
        });
    });
});
