var events = require('events');

const e = new events.EventEmitter();

const {
    DeviceGetAll
} = require("../repositories/device")
const Device = require("./entity/device/device")
const {
    StartServerCron
} = require("./server_cron");
const {
    LastDataGetAllFilter
} = require('../repositories/lastdata');

const Devices = []

module.exports = {
    Start: function () {

        DeviceGetAll({}).then(res => {
            res.forEach(d => {

                let dd = new Device(
                    d.get('id'),
                    d.get('parent_id'),
                    d.get('mod'),
                    e
                )

                Devices.push(dd)

                LastDataGetAllFilter({
                        device_id: dd.id
                    })
                    .then(last_data => dd.last_data = last_data)
                    .catch((e) => {
                        console.log(e)
                    })

            })
        }).catch((e) => {
            console.log(e)
        })

        StartServerCron(e)
    }
}