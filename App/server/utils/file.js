const fs = require("fs");

const deleteFile = (filePath) => {
  if (filePath !== "")
    fs.unlink(filePath, (error) => {
      if (error) throw error;
    });
};

exports.deleteFile = deleteFile;
