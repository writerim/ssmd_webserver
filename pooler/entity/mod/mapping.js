/*

Так как у нас мод может видоизменятся а для БД нам надо определенную структуру
как и для работы с модами при опросе
то нам надо иметь маппинг который будет конвертится то туда то туда

*/

module.exports = {
    // Маппинг для опросника
    MappingToPooler: (mod) => {
        return {
            max_count_conn: mod.max_count_conn ? mod.max_count_conn : 0 /* Считаем на валидным */,
            parameters: mod.parameters ? mod.parameters.reduce((res, item) => {
                res[item.ident] = {
                    delay: item.delay,
                    cmd: item.cmd,
                }
                return res
            }, {}) : {},
        }
    },
    
    // Маппинг для БД
    MappingToDB: (mod) => {
        return {
            ident: typeof mod.ident != "undefined" ? mod.ident : '',
            manufactures: typeof mod.manufactures != "undefined" ? mod.manufactures : '',
            mark: typeof mod.mark != "undefined" ? mod.mark : '',
            model: typeof mod.model != "undefined" ? mod.model : '',
            series: typeof mod.series != "undefined" ? mod.series : '',
            sowt_version: typeof mod.sowt_version != "undefined" ? mod.sowt_version : '',
            types_device: typeof mod.types_device != "undefined" ? mod.types_device : '',
            parameters: typeof mod.parameters != "undefined" ? mod.parameters.reduce((res, item) => {
                res.push(item.ident)
                return res
            }, []) : [],
            commands: typeof mod.commands != "undefined" ? mod.commands : [],
        }
    }
}