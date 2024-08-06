import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
    manifest_version: 3,
    name: "Letterboxd Tweaks",
    version: "0.0.1",
    description: "",
    permissions: ["storage", "activeTab"],
    icons: {
        "128": "icons/128x128.png"
    },
    background: {
        service_worker: "src/pages/background/index.ts",
        type: "module"
    },
    action: {
        default_popup: "src/pages/popup/index.html",
        default_icon: "icons/34x34.png"
    },
    options_page: "src/pages/options/index.html",
    content_scripts: [
        {
            matches: ["http://*.letterboxd.com/*", "https://*.letterboxd.com/*"],
            js: ["src/pages/content/index.ts"]
        }
    ]
});

export default manifest;
