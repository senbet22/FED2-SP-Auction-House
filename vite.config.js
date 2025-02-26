import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa", // Multi-Page App setup
  base: "", // Adjust the base URL if needed
  plugins: [tailwindcss()],
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
      output: {
        dir: "dist", // Specifies the directory for the build output
        format: "es", // Use 'es' (ES Module) format
        entryFileNames: "[name]/index.js", // Ensure that each HTML page has its own JS file
      },
    },
  },
});
