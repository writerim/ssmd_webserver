// generated


module.exports = class PlaceDevice {
constructor(data) {

if(!data){
            this.id = 0
                this.device_id = 0
                this.place_id = 0
                this.devices = []
            this.places = []
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.device_id = typeof data.device_id != 'undefined' ? data.device_id : 0
                this.place_id = typeof data.place_id != 'undefined' ? data.place_id : 0
                this.devices = typeof data.devices != 'undefined' ? data.devices : []
            this.places = typeof data.places != 'undefined' ? data.places : []
    }
}
            id = 0
                device_id = 0
                place_id = 0
                    devices = []
                places = []
    }