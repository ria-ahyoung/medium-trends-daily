import fs from "fs";

const readmeFiles = ["./template/static.md", "./template/dynamic.md"];

export default function mergeReadmeFiles() {
  try {
    const staticFileContent = fs.readFileSync(readmeFiles[0], "utf-8");
    const dynamicFileContent = fs.readFileSync(readmeFiles[1], "utf-8");

    const mergedContent = staticFileContent + "\n" + dynamicFileContent;
    fs.writeFileSync("./readme.md", mergedContent, "utf-8");

    console.log("Readme 파일 합치기가 완료되었습니다. 🎉");
  } catch (error) {
    console.error("❌ Readme 파일 합치기 중 오류가 발생했습니다:", error);
  }
}
