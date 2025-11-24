import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "mpa",
  base: "./",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        main: "index.html",
        auth: "auth/index.html",
        item: "item/index.html",
        profile: "profile/index.html",
        create: "item/create/index.html",
        edit: "item/edit/index.html",
      },
    },
  },
  plugins: [tailwindcss()],
});
