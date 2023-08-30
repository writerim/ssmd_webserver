const { Login } = require("../../use_cases/user.custom");
const UserCtx = require("../../entity/user");

module.exports = {

    // Авторизация пользователя
    CustomApiLoginUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        const user_ctx = new UserCtx(null)
        return Login(req.body, user_ctx).then(r => {
            res.end(JSON.stringify(r));
        }).catch(e => next(e))
    },

    // Проверка валидности токена
    CustomApiCheckTokenUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        this.isAuth(req, res).then(user => {
            if(!user){
                // res.end(JSON.stringify({ error: CONTEXT_NOT_FOUND }));
                return
            }
            return res.end(JSON.stringify(user));
        }).catch(e => {
            console.log(e);
            res.status(401).json({ error: e.message });
        })
    }

}