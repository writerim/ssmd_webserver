var events = require('events');
const EvetMod = require('./emulate');
const Device = require('../entity/device/device');

const assert = require('assert').strict;

describe("emulate", function () {

    
    it('inited events', async function () {
        
        let e = new events.EventEmitter();
        let emulator = new EvetMod(e, new Device(10,9,'',e))

        console.log(emulator)
        console.log(e)

    })

})