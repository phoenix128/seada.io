const { resolve } = require("node:path");
const project = resolve(process.cwd(), "tsconfig.json");

module.exports = {
    plugins: ["eslint-plugin-absolute-module-imports", "@typescript-eslint"],
    // extends: ["next", "turbo", "prettier"],
    extends: [
        "next",
        "next/core-web-vitals",
        "eslint-config-turbo",
        "turbo",
        "prettier"
    ],
    ignorePatterns: ["**/dist/*", "**/generated/*", "**/node_modules/*", "jest.config.ts"],
    rules: {
        "@next/next/no-html-link-for-pages": "off",
        "absolute-module-imports/only-absolute-module-imports": "error",
        '@typescript-eslint/no-explicit-any': 'off',
        "import/no-extraneous-dependencies": ["error", {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: false
        }]
    },
    settings: {
        "import/resolver": {
            typescript: {
                project,
            },
        },
    },
    parserOptions: {
        project,
    },
    globals: {
        React: true,
        JSX: true,
    },
    overrides: [
        {
            files: ["**/*.test.ts", 'seadas/**/*.ts'],
            rules: {
                "absolute-module-imports/only-absolute-module-imports": "off"
            }
        }
    ],
};
