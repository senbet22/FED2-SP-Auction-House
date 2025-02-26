import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa",
  base: "",
  plugins: [tailwindcss()],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        item: resolve(__dirname, "./item/index.html"),
        create: resolve(__dirname, "./item/create/index.html"),
        edit: resolve(__dirname, "./edit/create/index.html"),
      },
    },
  },
});
