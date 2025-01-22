import { Linter } from "eslint";

const config: Linter.FlatConfig[] = [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        plugins: {
            "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
        },
        rules: {
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
];

export default config;