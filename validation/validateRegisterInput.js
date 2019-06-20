const validator = require("validator");
const _ = require("lodash");
const {User} = require("../models/user")

validateRegisterInput = async (data) => {
    let errors = {};
    let isValid;

    // Kiểm tra xem Input có bị bỏ trống ko, nếu bị bỏ trống thì cho nó là **
    // data.email = data.email ? data.email : "";
    data.email = _.get(data, "email", "");
    data.password = _.get(data, "password", "");
    data.password2 = _.get(data, "password2", ""); // confirm password
    data.fullName = _.get(data, "fullName", "");
    data.DOB = _.get(data, "DOB", "");
    data.userType = _.get(data, "userType", "");
    data.phone = _.get(data, "phone", "");

    // _.toPairs() : Obj => arr
    // _.fromPairs() : arr => Obj
    // _.chain() : function programming: pipe line (output của thằng trước là input của thằng sau)

    // Validate
    // email
    if(validator.isEmpty(data.email)) { // true: "", false: có giá trị
        errors.email = "Email is required"
    } else if (!validator.isEmail(data.email)) { // true: email valid, false: email invalid
        errors.email = "Email is invalid"
    } else {
        const user = await User.findOne({email: data.email});
        if (user) errors.email = "Email exists"
    }

    // password
    if(validator.isEmpty(data.password)) {
        errors.password = "Password is required"
    } else if (!validator.isLength(data.password, {min: 6})) {
        errors.password = "Password has at least 6 characters"
    }

    // password2
    if(validator.isEmpty(data.password2)) {
        errors.password2 = "Confirm password is required"
    } else if (!validator.equals(data.password, data.password2)) {
        errors.password2 = "Password is not match"
    }

    // phone
    if(validator.isEmail(data.phone)) {
        errors.phone = "Phone is required"
    }  else if (!validator.isLength(data.phone, {min: 10, max: 15})) {
        errors.password = "Phone has from 10 to 15 characters"
    } else {
        const user = await User.findOne({phone: data.phone})
        if(user) errors.phone = "Phone exists"
    }


    return {
        //  isValid: true nếu errors là {}; false nếu errors có thuộc tính
        isValid: _.isEmpty(errors),
        errors
    }
}


module.exports = validateRegisterInput;