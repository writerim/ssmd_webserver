// generated


module.exports = class LastData {
constructor(data) {

if(!data){
            this.id = 0
                this.device_id = 0
                this.parameter_id = 0
                this.data = {}
                this.date = new Date()
                this.devices = []
            this.parameters = []
            }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.device_id = typeof data.device_id != 'undefined' ? data.device_id : 0
                this.parameter_id = typeof data.parameter_id != 'undefined' ? data.parameter_id : 0
                this.data = typeof data.data != 'undefined' ? data.data : {}
                this.date = typeof data.date != 'undefined' ? data.date : new Date()
                this.devices = typeof data.devices != 'undefined' ? data.devices : []
            this.parameters = typeof data.parameters != 'undefined' ? data.parameters : []
            }
}
            id = 0
                device_id = 0
                parameter_id = 0
                data = {}
                date = new Date()
                    devices = []
                parameters = []
            }