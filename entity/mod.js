// generated

module.exports = class Mod {
  constructor(data) {

    if (!data) {
      this.id = 0
      this.name = ''
      this.manufactures = ''
      this.mark = ''
      this.model = ''
      this.series = ''
      this.sowt_version = ''
      this.types_device = []
      this.parameters = []
      this.commands = []
      this.commands = []
    } else {

      this.id = typeof data.id != 'undefined' ? data.id : 0
      this.name = typeof data.name != 'undefined' ? data.name : ''
      this.manufactures = typeof data.manufactures != 'undefined' ? data.manufactures : ''
      this.mark = typeof data.mark != 'undefined' ? data.mark : ''
      this.model = typeof data.model != 'undefined' ? data.model : ''
      this.series = typeof data.series != 'undefined' ? data.series : ''
      this.sowt_version = typeof data.sowt_version != 'undefined' ? data.sowt_version : ''
      this.types_device = typeof data.types_device != 'undefined' ? data.types_device : []
      this.parameters = typeof data.parameters != 'undefined' ? data.parameters : []
      this.commands = typeof data.commands != 'undefined' ? data.commands : []
      this.commands = typeof data.commands != 'undefined' ? data.commands : []
    }
  }
  id = 0
  name = ''
  manufactures = ''
  mark = ''
  model = ''
  series = ''
  sowt_version = ''
  types_device = []
  parameters = []
  commands = []
  commands = []
}