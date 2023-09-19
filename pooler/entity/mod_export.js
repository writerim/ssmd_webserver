module.exports = class ModExport{
    constructor(
        protocol = null,
        name = null,
        manufactures = null,
        mark = null,
        model = null,
        series = null,
        sowt_version = null,
        types_device = [],
        parameters = [],
        commands = [],
        type_connect = null,
    ){
        this.protocol = protocol
        this.name = name
        this.manufactures = manufactures
        this.mark = mark
        this.model = model
        this.series = series
        this.sowt_version = sowt_version
        this.types_device = types_device
        this.parameters = parameters
        this.commands = commands
        this.type_connect = type_connect
    }
}