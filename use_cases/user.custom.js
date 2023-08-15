const UserCtx = require("../entity/User");
const { UserValidate } = require("../repositories/User");
const { UserFindByLoginByPassword, UserGetBySessionToken } = require("../repositories/user.custom");
var crypto = require('crypto');
const { EditUser } = require("./user");

const NOT_FOUND_CONTEXT = "context not found"
const INVALID_TOKEN = "token invalid"

module.exports = {

    async Login(data, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        if(!data.login || !data.password){
            throw new Error('invalid data. Used login and password') 
        }

        let pass_h = crypto.createHash('md5').update(data.password).digest("hex")

        return UserFindByLoginByPassword(data.login, pass_h).then(res => {
            if (!res) {
                throw new Error('user not found')
            }
            if (!res.dataValues.token) {
                res.dataValues.token = crypto.randomUUID()
                return EditUser(res.dataValues, new UserCtx(res.dataValues))
            }
            return new UserCtx(res.dataValues)
        })
    },

    async GetUserBySessionToken(token, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        return UserGetBySessionToken(token).then(res_user => {
            if (!res_user) {
                throw new Error(INVALID_TOKEN)
            }
            return new UserCtx(res_user.dataValues)
        })
    },

}