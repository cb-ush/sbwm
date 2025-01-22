const { FlatConfig } = require("eslint");

const config = [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: require("@typescript-eslint/parser"),
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: "./tsconfig.json", // Asigură-te că acest fișier există!
            },
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "error",
            "@typescript-eslint/explicit-function-return-type": "warn",
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
        },
    },
];

module.exports = config;