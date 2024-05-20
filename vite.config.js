import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import mpaPlugin from "vite-plugin-mpa-support";

export default defineConfig({
  plugins: [ViteImageOptimizer(), replacePathsPlugin(), mpaPlugin()],
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
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

function replacePathsPlugin() {
  return {
    name: "replace-paths",
    enforce: "post",
    generateBundle(options, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const chunk = bundle[fileName];
        if (chunk.type === "asset" || chunk.type === "chunk") {
          if (
            chunk.fileName.endsWith(".html") ||
            chunk.fileName.endsWith(".js") ||
            chunk.fileName.endsWith(".css")
          ) {
            if (chunk.source) {
              let content = chunk.source.toString();
              // Replace all occurrences of /assets/ with /dist/assets/
              content = content.replace(/\/assets\//g, "/dist/assets/");
              chunk.source = content;
            }
          }
        }
      });
    },
  };
}
