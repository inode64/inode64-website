import imagemin from "imagemin";
import png from "imagemin-pngquant";
import svg from "imagemin-svgo";
import webp from "imagemin-webp";
import fs from "fs";
import path from "path";
import { glob } from "glob";

const inputDir = "public";
const outputDir = "src/asset";
const quality = 85;

fs.rmSync(outputDir, { recursive: true, force: true });

(async () => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = await glob(`${inputDir}/**/*.{png,svg,webp}`);
  const results = [];

  for (const filePath of files) {
    const relativePath = path.relative(inputDir, filePath);
    const outputPath = path.join(outputDir, relativePath);
    const outputDirPath = path.dirname(outputPath);

    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }

    const originalSize = fs.statSync(filePath).size;

    const optimized = await imagemin([filePath], {
      destination: outputDirPath,
      plugins: [png({ quality: [quality / 100, quality / 100], strip: true }), webp({ quality }), svg()],
    });

    if (optimized.length > 0) {
      const optimizedPath = optimized[0].destinationPath;
      const optimizedSize = fs.statSync(optimizedPath).size;
      const reduction = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(2);

      if (optimizedSize < originalSize) {
        results.push({
          file: relativePath,
          originalSize,
          optimizedSize,
          reduction: `${reduction}%`,
          status: "✅ Optimized",
        });
      } else {
        // Borrar versión optimizada y usar original
        fs.unlinkSync(optimizedPath);
        fs.copyFileSync(filePath, outputPath);

        results.push({
          file: relativePath,
          originalSize,
          optimizedSize,
          reduction: `${reduction}%`,
          status: "⚠️ No mejora (original copiada)",
        });
      }
    }
  }

  console.table(results);
  console.log(`🔍 Completado: ${results.length} imágenes procesadas con calidad ${quality}%`);
})();
