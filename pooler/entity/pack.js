module.exports = class Pack{
    constructor(
        // Команда которую мы будем запускать
        Command = '',
        // Аргументы с которыми мы будем это все запускать
        Args = {},
        // Данные в буфере которые мы сгенерировали
        DataByf = null,
    ){
        this.Command = Command
        this.Args = Args
        this.DataByf = DataByf
    }
}
