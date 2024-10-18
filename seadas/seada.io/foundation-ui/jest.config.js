const jestConfig = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': ['ts-jest', { useESM: true, tsconfig: '<rootDir>/tsconfig.test.json' }],
    },
    moduleNameMapper: {
        '^@seada.io/(.+?)/(.*)$': '<rootDir>/../$1/src/$2',

        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    verbose: true,
    testPathIgnorePatterns: ['node_modules', 'dist'],
    watchPathIgnorePatterns: ['node_modules', 'dist'],
};

export default jestConfig;
