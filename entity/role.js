// generated


module.exports = class Role {
constructor(data) {

if(!data){
            this.id = 0
                this.name = ''
                this.description = ''
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.name = typeof data.name != 'undefined' ? data.name : ''
                this.description = typeof data.description != 'undefined' ? data.description : ''
    }
}
            id = 0
                name = ''
                description = ''
    }