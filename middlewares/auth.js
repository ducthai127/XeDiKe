const jwt = require("jsonwebtoken");

const authenticating = (req, res, next) => {
    // verify token
    //     - thành công: return next()
    //     - thất bại: res.json(err)

    const token = req.header("Authorization");
    try {
        const decoded = jwt.verify(token, "Cybersoft")
        console.log("TCL: authenticating -> decoded", decoded)
        req.user = decoded;
        next()
    }
    catch (error) {
        console.log("TCL: authenticating -> error", error)
        res.status(403).json({errors: "bạn không thể xem"})
    }
}

//  User: passenger, driver, admin
const authorizing = (userTypeArray) => {
    console.log("TCL: authorizing -> userTypeArray", userTypeArray)
    return (req, res, next) => {
        const {userType} = req.user;
        console.log("TCL: authorizing -> userType", userType)
        // userTypeArray: danh sách các loại người dùng có thể truy cập
        // userType: loại người dùng hiện tại (lấy từ decoded của token)
        // nểu userTypeArray có chứa userType => next
        if(userType === userTypeArray) {
            return next()
        } else {
            res.status(403).json({errors: "bạn đã đăng nhập, nhưng ko có wuyen xem điều này"})
        }
    }

}

module.exports = {
    authenticating, authorizing
}