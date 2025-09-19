import { defineManifest, ManifestV3Export } from "@crxjs/vite-plugin";
import { TARGET } from "../consts";

if (!TARGET) {
    throw new Error("TARGET is not defined");
}

const manifestBase: ManifestV3Export = {
    manifest_version: 3,
    name: "Letterboxd Tweaks",
    description:
        "Enhance Letterboxd with cleaner movie cards, instant search suggestions, and various quality of life improvements.",
    version: "0.0.15",
    permissions: ["storage"],
    host_permissions: ["https://letterboxd.com/*", "https://*.letterboxd.com/*", "https://*.ltrbxd.com/*"],
    icons: {
        "16": "icons/logo-16.png",
        "32": "icons/logo-32.png",
        "48": "icons/logo-48.png",
        "128": "icons/logo-128.png"
    },
    action: {
        default_popup: "src/pages/popup/index.html",
        default_icon: "icons/logo-48.png"
    },
    options_page: "src/pages/options/index.html",
    content_scripts: [
        {
            matches: ["http://*.letterboxd.com/*", "https://*.letterboxd.com/*", "https://*.ltrbxd.com/*"],
            js: ["src/pages/content/index.ts"]
        }
    ],
    web_accessible_resources: [
        {
            resources: ["icons/logo-16.png", "icons/logo-32.png", "icons/logo-48.png", "icons/logo-128.png"],
            matches: []
        }
    ]
};

if (TARGET === "chrome") {
    manifestBase.background = {
        service_worker: "src/pages/background/index.ts",
        type: "module"
    };
} else {
    // FIREFOX
    (manifestBase as any).browser_specific_settings = {
        gecko: {
            id: "letterboxd-tweaks@example.com",
            strict_min_version: "112.0"
        }
    };

    manifestBase.background = {
        scripts: ["src/pages/background/index.ts"],
        type: "module"
    };
}

const manifest = defineManifest(manifestBase);

export default manifest;
