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
            output: {
                assetFileNames(chunkInfo) {
                    if (chunkInfo.names[0] === "masking-type.css")
                        return "styles.css";
                    return "assets/[name]-[hash][extname]";
                },
            },
            external: ["obsidian"],
        },
    },
});
