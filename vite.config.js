import { defineConfig } from "vite";

export default defineConfig({
    build: {
        outDir: "",
        emptyOutDir: false,
        lib: {
            entry: "src/main.ts",
            fileName: (_, __) => "main.js",
            formats: ["cjs"],
        },
        rollupOptions: {
            external: ["obsidian"],
        },
    },
    test: {
        environment: "jsdom",
    },
});
