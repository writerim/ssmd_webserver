const crypto = require('crypto');

module.exports = class Issue {
    constructor(
        Cmd = null,
        Args = [],
        Device = null,
        // NextRunnning = new Date(),
        e = null
    ) {
        this.Cmd = Cmd
        this.Args = Args
        this.Device = Device

        this.UUID = crypto.randomUUID()

        // Высчитываем
        this.NextRunnning = new Date()

        var self = this

        // Слушаем что нашу задачу взяли
        const listener_confirm_issue = (parent_device, issue, result) => {
            if (parent_device.id == Device.id && issue.UUID == self.UUID) {
                if (result) {
                    this.Running = true
                    console.log(self.UUID, 'Работаем')
                    // Когда  мы работаем то нам надо передать задачу родителю
                    // NEW TOONEL(new events.EventEmitter())
                    // У него свои объекты прослушивания
                    // Умирает если по нему долго не было передачи данных
                } else {
                    // + next_run? or interval
                }
                this.Blocked = false
            }
        }

        // Слушаем удаление устройства и удаляем задачу и ее слушателя прибора
        const listener_remove_device = (device) => {
            if (device.id == Device.id) {
                self.destroy()
            }
        }

        e.on(`CONFIRM ISSUE`, listener_confirm_issue)
        e.on(`REMOVE DEVICE`, listener_remove_device)

        // Тутнужен демон для периодической проверки отправки
        this.Blocked = true
        e.emit(`SEND ISSUE`, Device, this)

        this.destroy = () => {
            e.removeListener(`CONFIRM ISSUE`, listener_confirm_issue)
            e.removeListener(`REMOVE DEVICE`, listener_remove_device)
        }

    }

    Blocked = false
    Running = false

}