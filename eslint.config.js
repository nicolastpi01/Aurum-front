import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
  // Cypress specs (Mocha + Cypress globals)
  {
    files: ["cypress/e2e/**/*.cy.{js,jsx}", "cypress/**/*.cy.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.mocha, // ✅ describe, it, before, beforeEach...
        cy: "readonly",
        Cypress: "readonly",
      },
    },
    rules: {
      // opcional: suele ser útil en tests
      "no-unused-expressions": "off",
    },
  },

  // Cypress support/commands files (no mocha, pero sí cy/Cypress)
  {
    files: ["cypress/support/**/*.{js,jsx}", "cypress/fixtures/**/*.{js,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        cy: "readonly",
        Cypress: "readonly",
      },
    },
  },
]);
