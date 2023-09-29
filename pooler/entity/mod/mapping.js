/*

Так как у нас мод может видоизменятся а для БД нам надо определенную структуру
как и для работы с модами при опросе
то нам надо иметь маппинг который будет конвертится то туда то туда

*/

module.exports = {
    // Маппинг для опросника
    MappingToPooler: (mod) => {
        return {
            max_count_conn: mod.max_count_conn,
            parameters: mod.parameters.reduce((res, item) => {
                res[item.ident] = {
                    delay: item.delay,
                    cmd: item.cmd,
                }
                return res
            }, {}),
        }
    },
    // Маппинг для БД
    MappingToDB: (mod) => {
        return {
            name: mod.name,
            manufactures: mod.manufactures,
            mark: mod.mark,
            model: mod.model,
            series: mod.series,
            sowt_version: mod.sowt_version,
            types_device: mod.types_device,
            parameters: mod.parameters ? mod.parameters.reduce((res, item) => {
                res.push(item.ident)
                return res
            }, []) : [],
            commands: mod.commands ? mod.commands : [],
        }
    }
}