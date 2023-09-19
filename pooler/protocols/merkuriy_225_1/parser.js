const DataDB = require("../../../entity/data")
const { PARAMETER_ENEMGY_TARIF_1, PARAMETER_ENEMGY_TARIF_2, PARAMETER_ENEMGY_TARIF_SUM } = require("../../contsants/parameters")

function parseInt(data) {
    return ((((Number(data[2]) << 16) + (Number(data[1]) << 8) + Number(data[0])) * 100) + Number(data[3])) * 10
}

function ParseData(buffer) {
    let crc = buffer.subarray(0, 3)
    let net1 = buffer.subarray(3, 5)
    let net2 = buffer.subarray(5, 7)
    let len = buffer.subarray(7, 8)
    let cmd = buffer.subarray(8, 9)
    let plc = buffer.subarray(9, 11)
    let data = buffer.subarray(11, buffer.byteLength - 1)

    for (let index = 0; index < data.byteLength - 1;) {
        let a = data.subarray(index, index + 11)
        let parameter = null
        switch (a[0]) {
            case 0x40:
                parameter = PARAMETER_ENEMGY_TARIF_1
                case 0x41:
                parameter = PARAMETER_ENEMGY_TARIF_2
                case 0x4F:
                parameter = PARAMETER_ENEMGY_TARIF_SUM
        }


        // find parameter
        let _data = new DataDB({
            parameter_id : 0,
            data : parseInt(a.subarray(1, 5)),
            date : new Date(a[10] + 2000 , a[9] + 1, a[8] + 1, a[7], a[6], 0)
        })
        console.log(_data)
        index = index + 11
    }
}

module.exports = {
    ParseData: ParseData,
    RR : null,
    RW : null,
    LR : null,
    LW : null,
}