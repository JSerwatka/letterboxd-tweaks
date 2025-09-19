import { crx } from "@crxjs/vite-plugin";
import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import { TARGET } from "./consts";

import manifest from "./src/manifest";

const isDev = process.env.__DEV__ === "true";

if (!TARGET) {
    throw new Error("TARGET is not defined");
}

export default defineConfig({
    server: {
        cors: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "*"
        },
        hmr: {
            // Helps HMR/connect from a chrome-extension:// origin during dev
            clientPort: 5173
        }
    },
    plugins: [tsconfigPaths(), solidPlugin(), crx({ manifest, browser: TARGET as any })],
    build: {
        emptyOutDir: true,
        outDir: TARGET === "chrome" ? "build" : "build.firefox",
        sourcemap: isDev,
        rollupOptions: {
            output: {
                entryFileNames: "src/pages/[name]/index.js",
                chunkFileNames: isDev ? "assets/js/[name].js" : "assets/js/[name].[hash].js"
            }
        }
    }
});
