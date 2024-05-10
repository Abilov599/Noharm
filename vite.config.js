import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { resolve } from "path";

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: findHTMLFiles(),
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "assets/[name][extname]",
      },
    },
  },
});

// Function to find all HTML files in the project directory
function findHTMLFiles() {
  const directory = "./"; // Directory where HTML files are located
  const htmlFiles = readdirSync(directory).filter((file) =>
    file.endsWith(".html"),
  );

  // Generate entry points object
  const entryPoints = {};
  htmlFiles.forEach((file) => {
    const name = file.replace(".html", "");
    entryPoints[name] = resolve(__dirname, `${directory}/${file}`);
  });

  return entryPoints;
}
