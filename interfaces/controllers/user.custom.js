const { Login } = require("../../use_cases/user.custom");
const UserCtx = require("../../entity/User");

module.exports = {

    // Авторизация пользователя
    CustomApiLoginUser (req, res, next) {
        res.setHeader('Content-Type', 'application/json');
        const user_ctx = new UserCtx(null)
        return Login(req.body, user_ctx).then(r => {
            res.end(JSON.stringify(r));
        }).catch(e => next(e))
    }

}