module.exports = class Device {
    constructor(
        id = 0,
        parent_id = 0,
        mod = '',
    ){
        this.id = id
        this.parent_id = parent_id
        this.mod = mod
    }
    id = 0
    parent_id = 0
    mod = ''
}