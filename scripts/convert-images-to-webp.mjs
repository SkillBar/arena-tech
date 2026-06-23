import { readdir, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/assets");
const extensions = new Set([".png", ".jpg", ".jpeg"]);
const removeSources = process.argv.includes("--remove-sources");

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

const files = await walk(root);

for (const file of files) {
  const output = file.replace(/\.(png|jpe?g)$/i, ".webp");
  await sharp(file).webp({ quality: 82, effort: 4 }).toFile(output);
  if (removeSources) {
    await unlink(file);
  }
  console.log(`${path.relative(root, file)} -> ${path.relative(root, output)}`);
}

console.log(`Converted ${files.length} images.`);
