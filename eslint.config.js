import js from "@eslint/js";
import obsidianmd from "eslint-plugin-obsidianmd";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig({
    files: ["**/*.ts"],
    extends: [
        js.configs.recommended,
        tseslint.configs.recommended,
        obsidianmd.configs.recommended,
    ],
    languageOptions: {
        parserOptions: { projectService: true },
    },
});
