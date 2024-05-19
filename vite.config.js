import { defineConfig } from "vite";
import { readdirSync } from "fs";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [ViteImageOptimizer(), replacePathsPlugin()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: findHTMLFiles(),
      output: {
        entryFileNames: "assets/[name].js", // JavaScript files in assets folder
        chunkFileNames: "assets/[name].js", // Chunk files in assets folder
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico|webp)$/.test(assetInfo.name)) {
            return "assets/images/[name][extname]";
          }
          return "assets/[name][extname]";
        },
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

// Custom plugin to replace paths inside file content
function replacePathsPlugin() {
  return {
    name: "replace-paths",
    enforce: "post",
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName];
        if (chunk.type === "asset" || chunk.type === "chunk") {
          if (chunk.source) {
            let content = chunk.source.toString();
            // Replace all occurrences of /assets/ with /dist/assets/
            content = content.replace(/\/assets\//g, "/dist/assets/");
            chunk.source = content;
          }
        }
      });
    },
  };
}
