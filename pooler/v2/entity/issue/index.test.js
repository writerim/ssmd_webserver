
var events = require('events');
const Issue = require('.');
const { DROP_DEVICE, CLOSE } = require('../../constants/commands');


const e = new events.EventEmitter();


const assert = require('assert').strict;

describe("pooler.issue", function () {

    it('created issue and droped', async function () {

        const issue = new Issue({
            uuid : 'asasasa-asas',
            args : [],
            cmd : 'CMD',
            device_id : 10,
            context_deadline_sec : 10
        }, e)

        assert.equal(e.eventNames().length, 3)
        issue.destroy()
        assert.equal(e.eventNames().length, 0)

        Object.keys(issue).forEach(prop => {
            assert.equal(issue.prop, undefined)
        })
    })


    it('droped device', async function () {

        const issue = new Issue({
            uuid : 'asasasa-asas',
            args : [],
            cmd : 'CMD',
            device_id : 10,
            context_deadline_sec : 10
        }, e)

        assert.equal(e.eventNames().length, 3)
        e.emit(`${DROP_DEVICE}10`)
        assert.equal(e.eventNames().length, 0)
        if(issue.destroy){
            issue.destroy()
        }
    })


    it('correct close issue', async function () {

        const issue = new Issue({
            uuid : 'asasasa-asas',
            args : [],
            cmd : 'CMD',
            device_id : 10,
            context_deadline_sec : 10
        }, e)

        assert.equal(e.eventNames().length, 3)
        e.emit(`${CLOSE}asasasa-asas`)
        assert.equal(e.eventNames().length, 0)
        if(issue.destroy){
            issue.destroy()
        }
    })


    it('close issue by time', async function () {

        const issue = new Issue({
            uuid : 'asasasa-asas',
            args : [],
            cmd : 'CMD',
            device_id : 10,
            context_deadline_sec : 1
        }, e)

        setTimeout(()=>{
            assert.equal(e.eventNames().length, 0)
            if(issue.destroy){
                issue.destroy()
            }
        },1200)
        
    })

    it('fail start', async function () {

        const issue = new Issue({
            uuid : 'asasasa-asas',
            args : [],
            cmd : 'CMD',
            device_id : 10,
            context_deadline_sec : 1
        }, e)

        issue.start()
        assert.equal(e.eventNames().length, 0)
        if(e.eventNames().length){
            issue.destroy()
        }
        
    })


})