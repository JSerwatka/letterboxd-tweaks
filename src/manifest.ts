import { defineManifest } from '@crxjs/vite-plugin';

const manifest = defineManifest({
  manifest_version: 3,
  name: 'Letterboxd Tweaks',
  version: '0.0.0',
  description: '',
  permissions: ['storage'],
  icons: {
    '128': 'icons/128x128.png'
  },
  background: {
    service_worker: 'src/pages/background/index.ts',
    type: 'module'
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icons/34x34.png'
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*'],
      js: ['src/pages/content/index.ts']
    }
  ],
  web_accessible_resources: [
    {
      resources: ['assets/js/*.js', 'assets/css/*.css', 'assets/img/*'],
      matches: ['*://*/*']
    }
  ]
});

export default manifest;
