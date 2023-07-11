// generated


module.exports = class User {
constructor(data) {

if(!data){
            this.id = 0
                this.name = ''
                this.last_name = ''
                this.login = ''
                this.password = ''
                this.parent_id = 0
                this.is_group = false
                this.lft = 0
                this.rgt = 0
                this.token = ''
                this.is_system = false
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.name = typeof data.name != 'undefined' ? data.name : ''
                this.last_name = typeof data.last_name != 'undefined' ? data.last_name : ''
                this.login = typeof data.login != 'undefined' ? data.login : ''
                this.password = typeof data.password != 'undefined' ? data.password : ''
                this.parent_id = typeof data.parent_id != 'undefined' ? data.parent_id : 0
                this.is_group = typeof data.is_group != 'undefined' ? data.is_group : false
                this.lft = typeof data.lft != 'undefined' ? data.lft : 0
                this.rgt = typeof data.rgt != 'undefined' ? data.rgt : 0
                this.token = typeof data.token != 'undefined' ? data.token : ''
                this.is_system = typeof data.is_system != 'undefined' ? data.is_system : false
    }
}
            id = 0
                name = ''
                last_name = ''
                login = ''
                password = ''
                parent_id = 0
                is_group = false
                lft = 0
                rgt = 0
                token = ''
                is_system = false
    }