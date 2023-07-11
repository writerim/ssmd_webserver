// generated


module.exports = class Device2Device {
constructor(data) {

if(!data){
            this.id = 0
                this.device_id = 0
                this.parameter_id = 0
                this.device_donor_id = 0
                this.parameter_donor_id = 0
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.device_id = typeof data.device_id != 'undefined' ? data.device_id : 0
                this.parameter_id = typeof data.parameter_id != 'undefined' ? data.parameter_id : 0
                this.device_donor_id = typeof data.device_donor_id != 'undefined' ? data.device_donor_id : 0
                this.parameter_donor_id = typeof data.parameter_donor_id != 'undefined' ? data.parameter_donor_id : 0
    }
}
            id = 0
                device_id = 0
                parameter_id = 0
                device_donor_id = 0
                parameter_donor_id = 0
    }