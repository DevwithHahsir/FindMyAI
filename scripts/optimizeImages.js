// optimizeImages.js
import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of directories to scan for images
const directories = [
  path.join(__dirname, "..", "public"),
  path.join(__dirname, "..", "src", "assets"),
  path.join(__dirname, "..", "src", "components"),
];

// Image file extensions to optimize
const imageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".svg"];

// Optimization commands based on file type
const optimizeImage = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  console.log(`Optimizing: ${filePath}`);

  try {
    // Different optimization based on image type
    // Note: These commands require the appropriate tools to be installed
    if (ext === ".jpg" || ext === ".jpeg") {
      execSync(
        `npx imagemin ${filePath} --out-dir=${path.dirname(
          filePath
        )} --plugin=mozjpeg`
      );
    } else if (ext === ".png") {
      execSync(
        `npx imagemin ${filePath} --out-dir=${path.dirname(
          filePath
        )} --plugin=pngquant`
      );
    } else if (ext === ".webp") {
      execSync(
        `npx imagemin ${filePath} --out-dir=${path.dirname(
          filePath
        )} --plugin=webp`
      );
    } else if (ext === ".svg") {
      execSync(`npx svgo ${filePath} -o ${filePath}`);
    }
    console.log(`Optimized: ${filePath}`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}: ${error.message}`);
  }
};

// Recursively scan directories for images
const scanDirectory = (dir) => {
  try {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        scanDirectory(filePath);
      } else if (
        stats.isFile() &&
        imageExtensions.includes(path.extname(file).toLowerCase())
      ) {
        optimizeImage(filePath);
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dir}: ${error.message}`);
  }
};

// Main execution
console.log("Starting image optimization...");
directories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    scanDirectory(dir);
  } else {
    console.log(`Directory not found: ${dir}`);
  }
});
console.log("Image optimization complete!");
