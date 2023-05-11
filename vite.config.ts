import react from "@vitejs/plugin-react-swc";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { resolve } from "path";
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { ManifestV3Export } from "@crxjs/vite-plugin";
import manifest from "./src/manifest";

const root = resolve(__dirname, "src");
const assetsDir = resolve(root, "assets");
const publicDir = resolve(__dirname, "public");
const uiDir = resolve(root, "ui");

export default defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@ui": uiDir,
    },
  },
  plugins: [
    react(),
    wasm(),
    topLevelAwait(),
    crx({ manifest: manifest as ManifestV3Export }),
  ],
  publicDir,
});
