const { CustomApiGetDeviceByType } = require("./controllers/device.custom");
const { ApiGetByIdUser } = require("./controllers/user");
const UserCtx = require("../entity/user");
const { CustomApiLoginUser, GetChatBySessionToken, CustomApiCheckTokenUser } = require("./controllers/user.custom");
const { GetUserBySessionToken } = require("../use_cases/user.custom");

const Context = {

    INVALID_TOKEN: 'invalid token',
    UNAUTH_USER: 'unauth user',

    fInvalidToken: (res) => {
        res.end(JSON.stringify({ error: this.INVALID_TOKEN }));
    },

    fUnauthUser: (res) => {
        res.end(JSON.stringify({ error: this.UNAUTH_USER }));
    },

    isAuth: async (req, res) => {
        let token = req.header('Token') || req.cookies.Token
        if (!token) {
            Context.fInvalidToken(res)
            return
        }
        return GetUserBySessionToken(token, new UserCtx()).then(chat => {
            if (chat) {
                return chat
            }
            Context.fUnauthUser(res)
            // throw new Error(this.UNAUTH_USER)
        }).catch(e => {
            LogError(e)
        })
    },
    // Исключения
    catch: (e, res) => e,

    isAdmin: (chat) => {
        return chat.is_admin
    },

    tipes: (count_tipes) => {
        return 20 * count_tipes
    }
}


const ContextApi = {
    ...Context, ContentType: 'application/json', catch: (res, e) => {
        return res.end(JSON.stringify({ error: e }));
    },
}


const CustomBaseRouter = (app) => {

    app.get('/api/device/all/:type_id', CustomApiGetDeviceByType.bind(ContextApi));
    app.post('/api/login', CustomApiLoginUser.bind(ContextApi));
    app.get('/api/check_token', CustomApiCheckTokenUser.bind(ContextApi));

}

module.exports = CustomBaseRouter;  