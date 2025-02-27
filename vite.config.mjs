import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa",
  base: "/",
  plugins: [tailwindcss()],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        auth: path.resolve(__dirname, "auth/index.html"),
        item: path.resolve(__dirname, "item/index.html"),
        profile: path.resolve(__dirname, "profile/index.html"),
        create: path.resolve(__dirname, "item/create/index.html"),
        edit: path.resolve(__dirname, "item/edit/index.html"),
      },
    },
  },
});
