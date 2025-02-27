import { defineConfig } from "vite";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "mpa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        login: resolve(__dirname, "./auth/index.html"),
        main: resolve(__dirname, "./index.html"),
        item: resolve(__dirname, "./item/index.html"),
        profile: resolve(__dirname, "./profile/index.html"),
        create: resolve(__dirname, "./item/create/index.html"),
        edit: resolve(__dirname, "./item/edit/index.html"),
      },
    },
  },
  plugins: [tailwindcss()],
});
