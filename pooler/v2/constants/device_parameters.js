module.exports = {
    IP : {
        ident: "ip",
        default_value: "127.0.0.1",
        placeholder: "Введите ip-адрес",
        format: "string",
        min_len: 7,
        max_len: 15,
        regular: /^([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3}).([0-9]{1,3})$/,
        require: true,
        legend: "IP-адрес",
    },
    PORT : {
        ident: "port",
        default_value: "9999",
        placeholder: "Введите порт",
        format: "int",
        min_len: 1,
        max_len: 70000,
        regular: /^([0-9]{1,5})$/,
        require: true,
        legend: "Порт",
    },
    NUM485 : {
        ident: "num485",
        default_value: "0",
        placeholder: "Введите адрес прибора",
        format: "int",
        min_len: 1,
        max_len: 70000,
        regular: /^([0-9]{1,5})$/,
        require: true,
        legend: "Адрес прибора",
    }
}