const multer = require("multer");
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    let type = "";
    if (file.mimetype === "application/octet-stream" || !file.mimetype) type = ".jpg";
    console.log("2", file.mimetype)
    cb(null,  Date.now() + "-" + file.originalname + type);
  }
});

const upload = multer({ storage });

module.exports = upload;