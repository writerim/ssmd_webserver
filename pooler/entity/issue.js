const crypto = require('crypto');

module.exports = class Issue{
    constructor(
        Cmd = null,
        Args = [],
        Device = null,
        NextRunnning = new Date(),
    ){
        this.Cmd = Cmd
        this.Args = Args
        this.Device = Device
        this.UUID = crypto.randomUUID()
        this.NextRunnning = NextRunnning
    }

    Blocked = false
    Running = false
    Error = null
    Session = null
    // Кол-во раз запуска перед опросом
    CountRepeat = 0
    // Кол-во раз корректно отработано
    CountSuccessClosed = 0
}