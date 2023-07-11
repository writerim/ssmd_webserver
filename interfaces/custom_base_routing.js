const { CustomApiGetDeviceByType } = require("./controllers/device.custom");

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
            throw new Error(this.INVALID_TOKEN)
        }
        return GetChatBySessionToken(token, new Chat()).then(chat => {
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

}

module.exports = CustomBaseRouter;  