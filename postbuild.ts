import { cp } from "fs/promises";

async function main() {
  try {
    await cp("dist/index.html", "dist/200.html");
    console.log("Copied dist/index.html to dist/200.html");
  } catch (err) {
    console.error("Failed to copy file:", err);
    process.exit(1);
  }
}

main();
