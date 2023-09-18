// vite.config.ts
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    server: { port: 4000 },
    resolve: {
        alias: {
            "@axxesJS": path.resolve(__dirname, "./src/axxesjs/index.ts"),
        },
    },
});
