const jwt = require("jsonwebtoken");

const authenticating = (req, res, next) => {
  // verify token
  //     - thành công: return next()
  //     - thất bại: res.json(err)

  const token = req.header("Authorization");
  const fingerprint = req.header("fingerprint");
  console.log("TCL: authenticating -> fingerprint", fingerprint);
  const KEY = "Cybersoft" + fingerprint;
  try {
    const decoded = jwt.verify(token, KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(403)
      .json({ errors: "Không thể vào, token hoặc fingerprint không hợp lệ." });
  }
};

//  User: passenger, driver, admin
const authorizing = userTypeArray => {
  console.log("TCL: authorizing -> userTypeArray", userTypeArray);
  return (req, res, next) => {
    const { userType } = req.user;
    console.log("TCL: authorizing -> userType", userType);
    // userTypeArray: danh sách các loại người dùng có thể truy cập
    // userType: loại người dùng hiện tại (lấy từ decoded của token)
    // nểu userTypeArray có chứa userType => next
    if (userType === userTypeArray) {
      return next();
    } else {
      res
        .status(403)
        .json({ errors: "bạn đã đăng nhập, nhưng ko có quyền xem điều này" });
    }
  };
};

module.exports = {
  authenticating,
  authorizing
};
