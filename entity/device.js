// generated


module.exports = class Device {
constructor(data) {

if(!data){
            this.id = 0
                this.paren_id = 0
                this.name = ''
                this.settings_connections = {}
                this.lft = 0
                this.rgt = 0
                this.place_id = 0
                this.utc = 0
                this.mod_id = 0
                this.time_settings = {}
                this.types = []
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.paren_id = typeof data.paren_id != 'undefined' ? data.paren_id : 0
                this.name = typeof data.name != 'undefined' ? data.name : ''
                this.settings_connections = typeof data.settings_connections != 'undefined' ? data.settings_connections : {}
                this.lft = typeof data.lft != 'undefined' ? data.lft : 0
                this.rgt = typeof data.rgt != 'undefined' ? data.rgt : 0
                this.place_id = typeof data.place_id != 'undefined' ? data.place_id : 0
                this.utc = typeof data.utc != 'undefined' ? data.utc : 0
                this.mod_id = typeof data.mod_id != 'undefined' ? data.mod_id : 0
                this.time_settings = typeof data.time_settings != 'undefined' ? data.time_settings : {}
                this.types = typeof data.types != 'undefined' ? data.types : []
    }
}
            id = 0
                paren_id = 0
                name = ''
                settings_connections = {}
                lft = 0
                rgt = 0
                place_id = 0
                utc = 0
                mod_id = 0
                time_settings = {}
                types = []
    }