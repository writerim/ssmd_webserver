// generated


module.exports = class Place {
constructor(data) {

if(!data){
            this.id = 0
                this.name = ''
                this.parent_id = 0
                this.lft = 0
                this.rgt = 0
                this.icon = ''
    }else{


            this.id = typeof data.id != 'undefined' ? data.id : 0
                this.name = typeof data.name != 'undefined' ? data.name : ''
                this.parent_id = typeof data.parent_id != 'undefined' ? data.parent_id : 0
                this.lft = typeof data.lft != 'undefined' ? data.lft : 0
                this.rgt = typeof data.rgt != 'undefined' ? data.rgt : 0
                this.icon = typeof data.icon != 'undefined' ? data.icon : ''
    }
}
            id = 0
                name = ''
                parent_id = 0
                lft = 0
                rgt = 0
                icon = ''
    }