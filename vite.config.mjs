import { defineConfig } from "vite";
import { fileURLToPath, URL } from "url";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./index.html"),
        auth: resolve(__dirname, "./auth/index.html"),
        item: resolve(__dirname, "./item/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        create: resolve(__dirname, "./item/create/index.html"),
        edit: resolve(__dirname, "./item/edit/index.html"),
      },
    },
  },
  plugins: [tailwindcss()],
});
