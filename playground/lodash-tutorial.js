const _ = require("lodash");

// _.empty
// check xem obj/array có phần tử nào hay ko
const obj = {}
console.log("check bình thường:", Object.keys(obj).length === 0)
console.log("check empty with lodash:", _.isEmpty(obj))


// _.get
let obj2 = {}
//  cần lấy obj2.content.attributes.id
const id = obj2.content && obj2.content.attributes && obj2.content.attributes.id;
console.log("check bình thường:", id)
console.log("lấy id với lodash:", _.get(obj2, "content.attributes.id"))


// _.set
console.log("set id với lodash:", _.set(obj2, "content.attributes.id", "2"))