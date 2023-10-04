
var events = require('events');
const LastData = require('.');


const e = new events.EventEmitter();


const assert = require('assert').strict;

describe("pooler.last_data", function () {

    it('created last_data', async function () {

        const last_data = new LastData({
            id : 100,
            device_id : 10,
            paramter_id : 8
        }, e)

        console.log(e.eventNames().length)
        last_data.destroy()
        console.log(e.eventNames().length)

       

    })

    it('droped db last_data', async function () {

        const last_data = new LastData({
            id : 100,
            device_id : 10,
            paramter_id : 8
        }, e)

        console.log(e.emit('DELETE:lastdata:100'))
        console.log(e.eventNames().length)
        if(last_data.destroy){
            last_data.destroy()
        }
        console.log(e.eventNames().length)

    })

    it('update db last_data', async function () {

        const last_data = new LastData({
            id : 100,
            device_id : 10,
            paramter_id : 8
        }, e)

        console.log(e.emit('UPDATE:lastdata:100', {
            id : 100,
            device_id : 123,
            paramter_id : 44
        }))
        console.log(last_data)
        if(last_data.destroy){
            last_data.destroy()
        }
        console.log(e.eventNames().length)

    })

})