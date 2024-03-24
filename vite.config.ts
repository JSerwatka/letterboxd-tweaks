import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";

import manifest from "./src/manifest";

const isDev = process.env.__DEV__ === "true";

export default defineConfig({
    plugins: [tsconfigPaths(), solidPlugin(), crx({ manifest })],
    build: {
        emptyOutDir: true,
        outDir: "build",
        sourcemap: isDev,
        rollupOptions: {
            output: {
                entryFileNames: "src/pages/[name]/index.js",
                chunkFileNames: isDev ? "assets/js/[name].js" : "assets/js/[name].[hash].js"
            }
        }
    }
});
