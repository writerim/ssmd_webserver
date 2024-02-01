// generated


module.exports = class UserPlace {
constructor(data) {

if(!data){
            this.id = 0
                this.plce_id = 0
                this.user_id = 0
                this.places = []
            this.users = []
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.plce_id = typeof data.plce_id != 'undefined' ? data.plce_id : 0
                this.user_id = typeof data.user_id != 'undefined' ? data.user_id : 0
                this.places = typeof data.places != 'undefined' ? data.places : []
            this.users = typeof data.users != 'undefined' ? data.users : []
    }
}
            id = 0
                plce_id = 0
                user_id = 0
                    places = []
                users = []
    }