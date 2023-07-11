// generated

                                                                            const { 
            ApiGetAllData,
            ApiGetFilterData,
                        ApiGetByIdData,
            ApiAddData,
            ApiEditData,
            ApiDeleteData
        } = require("./controllers/data");
                                                                                                                                                    const { 
            ApiGetAllDevice,
            ApiGetFilterDevice,
                        ApiGetByIdDevice,
            ApiAddDevice,
            ApiEditDevice,
            ApiDeleteDevice
        } = require("./controllers/device");
                                                                            const { 
            ApiGetAllDevice2Device,
            ApiGetFilterDevice2Device,
                        ApiGetByIdDevice2Device,
            ApiAddDevice2Device,
            ApiEditDevice2Device,
            ApiDeleteDevice2Device
        } = require("./controllers/device2device");
                                                                            const { 
            ApiGetAllLastData,
            ApiGetFilterLastData,
                        ApiGetByIdLastData,
            ApiAddLastData,
            ApiEditLastData,
            ApiDeleteLastData
        } = require("./controllers/lastdata");
                                                                                                                                                                            const { 
            ApiGetAllMod,
            ApiGetFilterMod,
                        ApiGetByIdMod,
            ApiAddMod,
            ApiEditMod,
            ApiDeleteMod
        } = require("./controllers/mod");
                                        const { 
            ApiGetAllParameter,
            ApiGetFilterParameter,
                        ApiGetByIdParameter,
            ApiAddParameter,
            ApiEditParameter,
            ApiDeleteParameter
        } = require("./controllers/parameter");
                                                                                        const { 
            ApiGetAllPlace,
            ApiGetFilterPlace,
                        ApiGetByIdPlace,
            ApiAddPlace,
            ApiEditPlace,
            ApiDeletePlace
        } = require("./controllers/place");
                                                    const { 
            ApiGetAllPlaceType,
            ApiGetFilterPlaceType,
                        ApiGetByIdPlaceType,
            ApiAddPlaceType,
            ApiEditPlaceType,
            ApiDeletePlaceType
        } = require("./controllers/placetype");
                                                    const { 
            ApiGetAllRole,
            ApiGetFilterRole,
                        ApiGetByIdRole,
            ApiAddRole,
            ApiEditRole,
            ApiDeleteRole
        } = require("./controllers/role");
                                                    const { 
            ApiGetAllRoleRule,
            ApiGetFilterRoleRule,
                        ApiGetByIdRoleRule,
            ApiAddRoleRule,
            ApiEditRoleRule,
            ApiDeleteRoleRule
        } = require("./controllers/rolerule");
                                                    const { 
            ApiGetAllRule,
            ApiGetFilterRule,
                        ApiGetByIdRule,
            ApiAddRule,
            ApiEditRule,
            ApiDeleteRule
        } = require("./controllers/rule");
                                                                const { 
            ApiGetAllSettingsEnterprise,
            ApiGetFilterSettingsEnterprise,
                        ApiGetByIdSettingsEnterprise,
            ApiAddSettingsEnterprise,
            ApiEditSettingsEnterprise,
            ApiDeleteSettingsEnterprise
        } = require("./controllers/settingsenterprise");
                                                                                                                                                    const { 
            ApiGetAllUser,
            ApiGetFilterUser,
                        ApiGetByIdUser,
            ApiAddUser,
            ApiEditUser,
            ApiDeleteUser
        } = require("./controllers/user");
                                                    const { 
            ApiGetAllUserPlace,
            ApiGetFilterUserPlace,
                        ApiGetByIdUserPlace,
            ApiAddUserPlace,
            ApiEditUserPlace,
            ApiDeleteUserPlace
        } = require("./controllers/userplace");

const UserCtx = require("../entity/User");
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
            throw new Error('invalid token');
        }
        return GetUserBySessionToken(token, new UserCtx()).then(user => {
            if (user) {
                return user
            }
            Context.fUnauthUser(res)
           // throw new Error(this.UNAUTH_USER)
        }).catch(e => {
            console.log(e)
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
const ContextWeb = {
    ...Context, catch: (res, err) => {
        res.render(dirname(require.main.filename) + '/views/admin/cron', {
            layout: "401",
            error: err
        })
    },
    // catch : (e,res) => {
    //     res.render(dirname(require.main.filename) + '/views/errror', {
    //         layout: "empty"
    //     })
    // },
    fInvalidToken: (res) => {
        res.redirect("/")
    },
    fUnauthUser: (res) => {
        res.redirect("/")
    }
}

const BaseRouter = (app) => {
                                                                        app.get('/api/data/all', ApiGetAllData.bind(ContextApi));
    app.get('/api/data/filter', ApiGetFilterData.bind(ContextApi));
    app.get('/api/data/:id', ApiGetByIdData.bind(ContextApi));
    app.post('/api/data/0', ApiAddData.bind(ContextApi));
    app.put('/api/data/:id', ApiEditData.bind(ContextApi));
    app.delete('/api/data/:id', ApiDeleteData.bind(ContextApi));
                                                                                                                                                app.get('/api/device/all', ApiGetAllDevice.bind(ContextApi));
    app.get('/api/device/filter', ApiGetFilterDevice.bind(ContextApi));
    app.get('/api/device/:id', ApiGetByIdDevice.bind(ContextApi));
    app.post('/api/device/0', ApiAddDevice.bind(ContextApi));
    app.put('/api/device/:id', ApiEditDevice.bind(ContextApi));
    app.delete('/api/device/:id', ApiDeleteDevice.bind(ContextApi));
                                                                        app.get('/api/device2device/all', ApiGetAllDevice2Device.bind(ContextApi));
    app.get('/api/device2device/filter', ApiGetFilterDevice2Device.bind(ContextApi));
    app.get('/api/device2device/:id', ApiGetByIdDevice2Device.bind(ContextApi));
    app.post('/api/device2device/0', ApiAddDevice2Device.bind(ContextApi));
    app.put('/api/device2device/:id', ApiEditDevice2Device.bind(ContextApi));
    app.delete('/api/device2device/:id', ApiDeleteDevice2Device.bind(ContextApi));
                                                                        app.get('/api/lastdata/all', ApiGetAllLastData.bind(ContextApi));
    app.get('/api/lastdata/filter', ApiGetFilterLastData.bind(ContextApi));
    app.get('/api/lastdata/:id', ApiGetByIdLastData.bind(ContextApi));
    app.post('/api/lastdata/0', ApiAddLastData.bind(ContextApi));
    app.put('/api/lastdata/:id', ApiEditLastData.bind(ContextApi));
    app.delete('/api/lastdata/:id', ApiDeleteLastData.bind(ContextApi));
                                                                                                                                                                        app.get('/api/mod/all', ApiGetAllMod.bind(ContextApi));
    app.get('/api/mod/filter', ApiGetFilterMod.bind(ContextApi));
    app.get('/api/mod/:id', ApiGetByIdMod.bind(ContextApi));
    app.post('/api/mod/0', ApiAddMod.bind(ContextApi));
    app.put('/api/mod/:id', ApiEditMod.bind(ContextApi));
    app.delete('/api/mod/:id', ApiDeleteMod.bind(ContextApi));
                                    app.get('/api/parameter/all', ApiGetAllParameter.bind(ContextApi));
    app.get('/api/parameter/filter', ApiGetFilterParameter.bind(ContextApi));
    app.get('/api/parameter/:id', ApiGetByIdParameter.bind(ContextApi));
    app.post('/api/parameter/0', ApiAddParameter.bind(ContextApi));
    app.put('/api/parameter/:id', ApiEditParameter.bind(ContextApi));
    app.delete('/api/parameter/:id', ApiDeleteParameter.bind(ContextApi));
                                                                                    app.get('/api/place/all', ApiGetAllPlace.bind(ContextApi));
    app.get('/api/place/filter', ApiGetFilterPlace.bind(ContextApi));
    app.get('/api/place/:id', ApiGetByIdPlace.bind(ContextApi));
    app.post('/api/place/0', ApiAddPlace.bind(ContextApi));
    app.put('/api/place/:id', ApiEditPlace.bind(ContextApi));
    app.delete('/api/place/:id', ApiDeletePlace.bind(ContextApi));
                                                app.get('/api/placetype/all', ApiGetAllPlaceType.bind(ContextApi));
    app.get('/api/placetype/filter', ApiGetFilterPlaceType.bind(ContextApi));
    app.get('/api/placetype/:id', ApiGetByIdPlaceType.bind(ContextApi));
    app.post('/api/placetype/0', ApiAddPlaceType.bind(ContextApi));
    app.put('/api/placetype/:id', ApiEditPlaceType.bind(ContextApi));
    app.delete('/api/placetype/:id', ApiDeletePlaceType.bind(ContextApi));
                                                app.get('/api/role/all', ApiGetAllRole.bind(ContextApi));
    app.get('/api/role/filter', ApiGetFilterRole.bind(ContextApi));
    app.get('/api/role/:id', ApiGetByIdRole.bind(ContextApi));
    app.post('/api/role/0', ApiAddRole.bind(ContextApi));
    app.put('/api/role/:id', ApiEditRole.bind(ContextApi));
    app.delete('/api/role/:id', ApiDeleteRole.bind(ContextApi));
                                                app.get('/api/rolerule/all', ApiGetAllRoleRule.bind(ContextApi));
    app.get('/api/rolerule/filter', ApiGetFilterRoleRule.bind(ContextApi));
    app.get('/api/rolerule/:id', ApiGetByIdRoleRule.bind(ContextApi));
    app.post('/api/rolerule/0', ApiAddRoleRule.bind(ContextApi));
    app.put('/api/rolerule/:id', ApiEditRoleRule.bind(ContextApi));
    app.delete('/api/rolerule/:id', ApiDeleteRoleRule.bind(ContextApi));
                                                app.get('/api/rule/all', ApiGetAllRule.bind(ContextApi));
    app.get('/api/rule/filter', ApiGetFilterRule.bind(ContextApi));
    app.get('/api/rule/:id', ApiGetByIdRule.bind(ContextApi));
    app.post('/api/rule/0', ApiAddRule.bind(ContextApi));
    app.put('/api/rule/:id', ApiEditRule.bind(ContextApi));
    app.delete('/api/rule/:id', ApiDeleteRule.bind(ContextApi));
                                                            app.get('/api/settingsenterprise/all', ApiGetAllSettingsEnterprise.bind(ContextApi));
    app.get('/api/settingsenterprise/filter', ApiGetFilterSettingsEnterprise.bind(ContextApi));
    app.get('/api/settingsenterprise/:id', ApiGetByIdSettingsEnterprise.bind(ContextApi));
    app.post('/api/settingsenterprise/0', ApiAddSettingsEnterprise.bind(ContextApi));
    app.put('/api/settingsenterprise/:id', ApiEditSettingsEnterprise.bind(ContextApi));
    app.delete('/api/settingsenterprise/:id', ApiDeleteSettingsEnterprise.bind(ContextApi));
                                                                                                                                                app.get('/api/user/all', ApiGetAllUser.bind(ContextApi));
    app.get('/api/user/filter', ApiGetFilterUser.bind(ContextApi));
    app.get('/api/user/:id', ApiGetByIdUser.bind(ContextApi));
    app.post('/api/user/0', ApiAddUser.bind(ContextApi));
    app.put('/api/user/:id', ApiEditUser.bind(ContextApi));
    app.delete('/api/user/:id', ApiDeleteUser.bind(ContextApi));
                                                app.get('/api/userplace/all', ApiGetAllUserPlace.bind(ContextApi));
    app.get('/api/userplace/filter', ApiGetFilterUserPlace.bind(ContextApi));
    app.get('/api/userplace/:id', ApiGetByIdUserPlace.bind(ContextApi));
    app.post('/api/userplace/0', ApiAddUserPlace.bind(ContextApi));
    app.put('/api/userplace/:id', ApiEditUserPlace.bind(ContextApi));
    app.delete('/api/userplace/:id', ApiDeleteUserPlace.bind(ContextApi));



};

module.exports = BaseRouter;