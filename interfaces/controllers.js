const { 
    Add, 
    FindById, 
    Update, 
    Drop, 
    GetAll 
} = require("../use_cases/");

module.exports = {
    ApiAdd (req, res, next) {
        res.setHeader('Content-Type', this.ContentType);
        {* this.isAuth(req, res).then(chat => { *}
            {* const user_ctx = new Chat(chat.dataValues) *}
            return Add(req.body, null).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        {* }) *}
    },
    ApiFindById (req, res, next) {
        res.setHeader('Content-Type', this.ContentType);
        {* this.isAuth(req, res).then(chat => { *}
            {* const user_ctx = new Chat(chat.dataValues) *}
            return FindById(req.params.id, null).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        {* }) *}
    },
    ApiUpdate (req, res, next) {
        res.setHeader('Content-Type', this.ContentType);
        {* this.isAuth(req, res).then(chat => { *}
            {* const user_ctx = new Chat(chat.dataValues) *}
            return Update(req.body, null).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        {* }) *}
    },
    ApiDrop (req, res, next) {
        res.setHeader('Content-Type', this.ContentType);
        {* this.isAuth(req, res).then(chat => { *}
            {* const user_ctx = new Chat(chat.dataValues) *}
            return Drop(req.params.id, null).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        {* }) *}
    },
    ApiGetAll (req, res, next) {
        res.setHeader('Content-Type', this.ContentType);
        {* this.isAuth(req, res).then(chat => { *}
            {* const user_ctx = new Chat(chat.dataValues) *}
            return GetAll(null).then(r => {
                res.end(JSON.stringify(r));
            }).catch(e => next(e))
        {* }) *}
    },
}