
var events = require('events');
const Device = require('.');
const { setTimeout } = require('timers/promises');
const { GET_DEVICE, GET_DEVICE_TREE, UPDATE_DEVICE } = require('../../constants/commands');


const e = new events.EventEmitter();


const assert = require('assert').strict;

describe("pooler.device", function () {

    it('created and droped device', async function () {

        const device = new Device({
            id : 100,
            mod_id : 10,
        }, e)

        assert.notEqual(e.eventNames().length, 0)
        device.destroy()
        assert.equal(e.eventNames().length, 0)

    })

    it('invalid created', async function () {

        try{
            new Device({}, e)
        } catch (e){
            assert.equal(e.message, `not created device. id invalid`)
        }
        try{
            new Device({id: 10}, e)
        } catch (e){
            assert.equal(e.message, `not created device. mod_id invalid`)
        }
        
    })

    it('Связывание устройств', function () {

        new Device({id : 1 , parent_id: 0 , mod_id: 10}, e)
        new Device({id : 6 , parent_id: 1 , mod_id: 10}, e)
        new Device({id : 10 , parent_id: 6 , mod_id: 10}, e)

        e.listeners(`${GET_DEVICE_TREE}10`).forEach(l => {
            let tree = l()
            assert.equal(tree.length, 3)
        })
        
    })

    it('Связывание устройств и перенос родителя', function () {

        new Device({id : 1 , parent_id: 0 , mod_id: 10}, e)
        new Device({id : 6 , parent_id: 1 , mod_id: 10}, e)
        new Device({id : 10 , parent_id: 6 , mod_id: 10}, e)
        new Device({id : 44 , parent_id: 0 , mod_id: 10}, e)

        e.listeners(`${GET_DEVICE_TREE}10`).forEach(l => {
            let tree = l()
            assert.equal(tree.length, 3)
        })

        e.emit(`${UPDATE_DEVICE}6`,{id : 6 , parent_id: 44 , mod_id: 10})

        e.listeners(`${GET_DEVICE_TREE}10`).forEach(l => {
            let tree = l()
            assert.equal(tree.length, 3)
        })
    })


})