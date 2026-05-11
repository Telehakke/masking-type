import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "",
        emptyOutDir: false,
        lib: {
            entry: "src/main.ts",
            fileName: () => "main.js",
            formats: ["cjs"],
        },
        rolldownOptions: {
            external: ["obsidian"],
        },
    },
    test: {
        environment: "jsdom",
    },
});
