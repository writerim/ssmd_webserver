const Device = require('./device');
const Issue = require('./issue');
const Session = require('./session');

const assert = require('assert').strict;

describe("pooler.entity", function () {

    let add_id = 0

    it('Created Session', async function () {

        let issues = new Issue()

        let session = new Session(issues, new Device(10, 9, 'ce102_r5'), [
            new Device(9, 8, 'ce102_r5'),
            new Device(8, 0, 'ce102_r5'),
        ])

        console.log(session)

    })

})