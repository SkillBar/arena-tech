#!/usr/bin/env node
import { readdir, unlink } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/assets");
const legacy = new Set([".png", ".jpg", ".jpeg"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }

    if (legacy.has(path.extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }

  return files;
}

const files = await walk(root);
for (const file of files) {
  await unlink(file);
  console.log(`removed ${path.relative(root, file)}`);
}

console.log(`Removed ${files.length} legacy raster files.`);
