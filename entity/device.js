// generated


module.exports = class Device {
constructor(data) {

if(!data){
            this.id = 0
                this.parent_id = 0
                this.name = ''
                this.settings_connections = {}
                this.lft = 0
                this.rgt = 0
                this.utc = 0
                this.mod_id = 0
                this.time_settings = {}
                this.types = []
                this.status = 0
                this.is_exclude = false
                this.devices = []
                                this.mods = []
                    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.parent_id = typeof data.parent_id != 'undefined' ? data.parent_id : 0
                this.name = typeof data.name != 'undefined' ? data.name : ''
                this.settings_connections = typeof data.settings_connections != 'undefined' ? data.settings_connections : {}
                this.lft = typeof data.lft != 'undefined' ? data.lft : 0
                this.rgt = typeof data.rgt != 'undefined' ? data.rgt : 0
                this.utc = typeof data.utc != 'undefined' ? data.utc : 0
                this.mod_id = typeof data.mod_id != 'undefined' ? data.mod_id : 0
                this.time_settings = typeof data.time_settings != 'undefined' ? data.time_settings : {}
                this.types = typeof data.types != 'undefined' ? data.types : []
                this.status = typeof data.status != 'undefined' ? data.status : 0
                this.is_exclude = typeof data.is_exclude != 'undefined' ? data.is_exclude : false
                this.devices = typeof data.devices != 'undefined' ? data.devices : []
                                this.mods = typeof data.mods != 'undefined' ? data.mods : []
                    }
}
            id = 0
                parent_id = 0
                name = ''
                settings_connections = {}
                lft = 0
                rgt = 0
                utc = 0
                mod_id = 0
                time_settings = {}
                types = []
                status = 0
                is_exclude = false
                    devices = []
                                    mods = []
                    }