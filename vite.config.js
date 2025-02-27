import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  appType: "mpa",
  base: "/",
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    target: "esnext",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "FED2-SP-AUCTION-HOUSE/index.html"),
        auth: resolve(__dirname, "FED2-SP-AUCTION-HOUSE/auth/index.html"),
        item: resolve(__dirname, "FED2-SP-AUCTION-HOUSE/item/index.html"),
        profile: resolve(__dirname, "FED2-SP-AUCTION-HOUSE/profile/index.html"),
        create: resolve(
          __dirname,
          "FED2-SP-AUCTION-HOUSE/item/create/index.html"
        ),
        edit: resolve(__dirname, "FED2-SP-AUCTION-HOUSE/item/edit/index.html"),
      },
    },
  },
});
