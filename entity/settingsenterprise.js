// generated

module.exports = class SettingsEnterprise {
  constructor(data) {

    if (!data) {
      this.id = 0
      this.description = ''
      this.index = ''
      this.value = ''
    } else {

      this.id = typeof data.id != 'undefined' ? data.id : 0
      this.description = typeof data.description != 'undefined' ? data.description : ''
      this.index = typeof data.index != 'undefined' ? data.index : ''
      this.value = typeof data.value != 'undefined' ? data.value : ''
    }
  }
  id = 0
  description = ''
  index = ''
  value = ''
}