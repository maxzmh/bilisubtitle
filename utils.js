const fs = require("fs");
exports.createFileWithPath = function (filePath) {
  const dirPath = filePath.slice(0, filePath.lastIndexOf("/"));
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  fs.writeFileSync(filePath, "");
};
