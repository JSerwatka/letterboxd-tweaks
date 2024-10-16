import { defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
    manifest_version: 3,
    name: "Letterboxd Tweaks",
    description: "Enhance Letterboxd with cleaner movie cards, instant search suggestions, and various quality of life improvements.",
    version: "0.0.3",
    permissions: ["storage"],
    icons: {
        '16': 'icons/logo-16.png',
        '32': 'icons/logo-32.png',
        '48': 'icons/logo-48.png',
        '128': 'icons/logo-128.png'
    },
    background: {
        service_worker: "src/pages/background/index.ts",
        type: "module"
    },
    action: {
        default_popup: "src/pages/popup/index.html",
        default_icon: "icons/logo-48.png"
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
