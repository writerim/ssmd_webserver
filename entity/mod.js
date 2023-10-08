// generated

module.exports = class Mod {
  constructor(data) {

    if (!data) {
      this.id = 0
      this.ident = ''
      this.manufactures = ''
      this.mark = ''
      this.model = ''
      this.series = ''
      this.sowt_version = ''
      this.types_device = []
      this.cron_parameters = []
      this.commands = []
      this.parameters = []
      this.time_settings = []
      this.device_parameters = []
    } else {

      this.id = typeof data.id != 'undefined' ? data.id : 0
      this.ident = typeof data.ident != 'undefined' ? data.ident : ''
      this.manufactures = typeof data.manufactures != 'undefined' ? data.manufactures : ''
      this.mark = typeof data.mark != 'undefined' ? data.mark : ''
      this.model = typeof data.model != 'undefined' ? data.model : ''
      this.series = typeof data.series != 'undefined' ? data.series : ''
      this.sowt_version = typeof data.sowt_version != 'undefined' ? data.sowt_version : ''
      this.types_device = typeof data.types_device != 'undefined' ? data.types_device : []
      this.cron_parameters = typeof data.cron_parameters != 'undefined' ? data.cron_parameters : []
      this.commands = typeof data.commands != 'undefined' ? data.commands : []
      this.parameters = typeof data.parameters != 'undefined' ? data.parameters : []
      this.time_settings = typeof data.time_settings != 'undefined' ? data.time_settings : []
      this.device_parameters = typeof data.device_parameters != 'undefined' ? data.device_parameters : []
    }
  }
  id = 0
  ident = ''
  manufactures = ''
  mark = ''
  model = ''
  series = ''
  sowt_version = ''
  types_device = []
  cron_parameters = []
  commands = []
  parameters = []
  time_settings = []
  device_parameters = []
}