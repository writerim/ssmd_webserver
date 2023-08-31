const User = require("./entity/user");
const UserCtx = require("./entity/user");

let user_ctx = new User()
console.log(user_ctx instanceof UserCtx)