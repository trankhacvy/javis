import type { Manifest } from "webextension-polyfill";
import pkg from "../package.json";

const manifest: Manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: "Javis - The Ultimate AI Assistant",
  version: pkg.version,
  description:
    "Your ultimate AI-assistant designed to revolutionize your web browsing experience.",
  options_ui: {
    page: "src/options/index.html",
    open_in_tab: true,
  },
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  action: {
    // default_popup: "src/popup/index.html",
    default_icon: "icon-48.png",
  },
  icons: {
    "16": "icon-16.png",
    "32": "icon-32.png",
    "48": "icon-48.png",
    "128": "icon-128.png",
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*", "<all_urls>"],
      js: ["src/content/index.ts", "src/ui/index.tsx"],
      css: ["contentStyle.css"],
      run_at: "document_end",
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        "contentStyle.css",
        "icon-128.png",
        "icon-48.png",
        "icon-32.png",
        "icon-16.png",
        "user-avatar.jpg",
        "javis-avatar.png",
      ],
      matches: ["<all_urls>"],
    },
  ],
  permissions: ["contextMenus", "activeTab", "scripting", "storage"],
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self';",
  },
  commands: {
    open: {
      suggested_key: {
        default: "Ctrl+J",
        mac: "Command+J",
      },
      description: "open",
    },
  },
};

export default manifest;
