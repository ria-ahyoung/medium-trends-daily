import fs from "fs";
import generateDateTitle from "./generateDateTitle.js";

const readmeFiles = ["./src/template/static.md", "./src/template/dynamic.md"];

export default function mergeReadmeFiles() {
  try {
    const title = generateDateTitle();
    const staticFileContent = fs.readFileSync(readmeFiles[0], "utf-8");
    const dynamicFileContent = fs.readFileSync(readmeFiles[1], "utf-8");

    const mergedContent = title + staticFileContent + "\n" + dynamicFileContent;
    fs.writeFileSync("./readme.md", mergedContent, "utf-8");

    console.log("📖 Readme merge completed.");
  } catch (error) {
    console.error("❌ Error occurred during Readme merge:", error);
  }
}
