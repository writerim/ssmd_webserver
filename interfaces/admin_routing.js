const path = require('path');

const AdminRouter = (app) => {
    app.get(/\/(?!(?:api)\b).*/, (req, res, next) => {
        res.sendFile(path.join(__dirname, 'web/static/index.html'), {
            layout: "clean",
        });
    });
};

module.exports = AdminRouter;