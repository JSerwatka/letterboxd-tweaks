import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
    manifest_version: 3,
    name: "Letterboxd Tweaks",
    description: "Enhances the Letterboxd website with cleaner movie cards, a more efficient search bar, and an improved user interface that hides unnecessary filters, navbar items, and sort options",
    version: "0.0.1",
    permissions: ["storage", "activeTab"],
    icons: {
        '16': 'img/logo-16.png',
        '32': 'img/logo-32.png',
        '48': 'img/logo-48.png',
        '128': 'img/logo-128.png'
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
    ],
    web_accessible_resources: [
        {
          resources: ['icons/logo-16.png', 'icons/logo-32.png', 'icons/logo-48.png', 'icons/logo-128.png'],
          matches: []
        }
      ]
});

export default manifest;
