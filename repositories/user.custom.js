const { UserModel, UserAdd } = require("./user")
const { GetConnect } = require("./connect")


const FindByLoginByPassword = async (login, password) => {
    return UserModel.findOne({
        where: {
            login: login,
            password: password,
        }
    })
}

// Поиск системных пользователей
const FindByIsSystem = async (is_system) => {
    return UserModel.findOne({
        where: {
            is_system: is_system,
        }
    })
}

const GetBySessionToken = async (token) => {
    return UserModel.findOne({
        where: {
            token: token,
        }
    })
}


GetConnect({
    name: 'create_default_user', deamon: function () {
        console.log('start create_default_user')
        setTimeout(function () {
            FindByIsSystem(true).then(res => {
                console.log((res))
                if (!res) {
                    UserAdd({
                        password: '21232f297a57a5a743894a0e4a801fc3',
                        login: 'admin',
                        lft: 1,
                        rgt: 2,
                        is_system: true,
                        name: 'Администратор',
                        parent_id: 0,
                        is_group: false,
                        token: '',
                    })
                }
            })
        }, 1000)
    }
})

module.exports = {
    UserFindByLoginByPassword: FindByLoginByPassword,
    UserGetBySessionToken: GetBySessionToken,
    UserFindByIsSystem: FindByIsSystem
}