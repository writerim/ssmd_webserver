var events = require('events');
const APP_EVENTS = new events.EventEmitter();
APP_EVENTS.setMaxListeners(0)
module.exports = {
    APP_EVENTS
}