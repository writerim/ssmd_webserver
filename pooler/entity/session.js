const Device = require("./device");
const Mod = require("./mod");

// Проверка что все приборы связаны и корректные
const IsCorrectDevices = function(device, parents){
  if(device.parent_id && !parents.some(parent => parent.id == device.parent_id)){
    return false
  }
  let is_correct = true
  parents.forEach(parent => {
    if(parent.parent_id && !parents.some(p => parent.parent_id == p.id)){
        is_correct = false
    }
  })
  return is_correct
}

// Вешаем события чтобы можно было их обрабатывать
const SetEmit = function(mods, e){

}

module.exports = class Session {

    constructor(
        issue = null,
        device = new Device(),
        parents = [],
        e
    ) {

        if (!(device instanceof Device)) {
            e.emit('error', new Error("Session. incorrect device in issue"))
            return
        }

        if (!device.id) {
            e.emit('error', new Error("Session. Id device incorrect"))
            return
        }

        let mod_device = new Mod(device.mod, device.id, e)
        if (mod_device instanceof Error) {
            e.emit('error', mod_device)
            return mod_device
        }

        if(mod_device.settings.commands.indexOf(issue.Cmd) == -1){
            e.emit('error', new Error('Session. mod not supported command'))
            return
        }

        if(!IsCorrectDevices(device, parents)){
            e.emit('error', new Error('Session. incorrect tree devices'))
            return 
        }

        this.mods.push(mod_device)

        let is_error_created_session = false
        parents.forEach(element => {
            if (is_error_created_session) return
            let mod_parent = new Mod(element.mod, element.id, e)
            if (mod_parent instanceof Error) {
                e.emit('error', mod_parent)
                is_error_created_session = true
                return mod_parent
            }
            this.mods.push(mod_parent)
        });

        e.on('close', () => {
            console.log('произошло событие!');
        }).on('timeout', () => {
            console.log('произошло событие!');
        }).on('error', (e) => {
            // 
        })

        // SetEmit(this.mods, e)

        // // Вешаем события чтобы можно было их обрабатывать
        // // this.mods.forEach()

        // mod_device.Start(issue)

    }
    mods = [] // SessionBlock
    issue = null
    error = null
    device_id = 0
    parents = 0
    next_running = new Date()
}