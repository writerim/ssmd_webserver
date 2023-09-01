var crypto = require('crypto');

const { UserFindByLoginByPassword, UserGetBySessionToken } = require("../repositories/user.custom");
const { EditUser } = require("./user");
const UserCtx = require("../entity/user");

const NOT_FOUND_CONTEXT = "context not found"
const INVALID_TOKEN = "token invalid"
const USER_NOT_FOUND = 'user not found'
const INVALID_DATA = 'invalid data. Used login and password'

module.exports = {

    async Login(data, user_ctx) {
        if (!user_ctx || !(user_ctx instanceof UserCtx)) {
            throw new Error(NOT_FOUND_CONTEXT)
        }

        if(!data.login || !data.password){
            throw new Error(INVALID_DATA) 
        }

        let pass_h = crypto.createHash('md5').update(data.password).digest("hex")

        return UserFindByLoginByPassword(data.login, pass_h).then(res => {
            if (!res) {
                throw new Error(USER_NOT_FOUND)
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