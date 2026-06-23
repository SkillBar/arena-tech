import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const assetsRoot = path.resolve(
  fileURLToPath(new URL("../../public/assets", import.meta.url))
);
const extensions = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (extensions.has(ext)) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await walk(assetsRoot);

for (const file of files) {
  const output = file.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(file).webp({ quality: 82, effort: 4 }).toFile(output);
  console.log(`${path.relative(assetsRoot, file)} -> ${path.relative(assetsRoot, output)}`);
}

console.log(`Converted ${files.length} images.`);
