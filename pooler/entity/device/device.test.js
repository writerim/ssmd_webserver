
var events = require('events');
const Device = require('./device');
const Issue = require('../issue');


const assert = require('assert').strict;

const e = new events.EventEmitter();
describe("pooler.entity", function () {

    it('Created Session', async function () {


        let device = new Device(10,9 , '' , e)
        let converter = new Device(9,8 , '' , e)
        let host = new Device(8,0 , '' , e)

        device.mod_obj.max_count_conn = 1
        converter.mod_obj.max_count_conn = 1
        host.mod_obj.max_count_conn = 1

        let issue = new Issue('asasa', [] , device, e)
        let issue2 = new Issue('asasa', [] , device, e)

        console.log(issue,issue2)
        device.issues = [issue]

        
        setTimeout(() => {

            console.log(e.listeners(`CONFIRM ISSUE`).length , "LENGTH !!")
            issue.destroy()
            issue2.destroy()
            
            // e.removeAllListeners()
            device.destroy()
            converter.destroy()
            host.destroy()
            console.log(e.listeners(`CONFIRM ISSUE`).length , "LENGTH !")




        }, 1000);

    })

})