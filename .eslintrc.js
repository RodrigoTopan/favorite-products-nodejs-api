module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-base", "prettier"],
    plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        "prettier/prettier": "error",
        "no-param-reassign": "off",
        "consistent-return": "off",
        "prefer-default-export": "off",
        "class-methods-use-this": "off",
        "no-unused-vars": ["error", { argsIgnorePattern: "next" }],
    },
    settings: {
        "import/resolver": {
            alias: [
                ["~", ""],
                ["@controllers", "./src/app/controllers"],
                ["@models", "./src/app/models"],
                ["@services", "./src/app/services"],
                ["@middlewares", "./src/app/middlewares"],
                ["@validators", "./src/app/validators"],
                ["@cache", "./src/cache"],
                ["@utils", "./src/utils"],
                ["@configurations", "./src/configurations"],
            ],
        },
    },
};
