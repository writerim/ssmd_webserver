// generated

module.exports = class RoleRule {
  constructor(data) {

    if (!data) {
      this.id = 0
      this.role_id = 0
      this.rule_id = 0
    } else {

      this.id = typeof data.id != 'undefined' ? data.id : 0
      this.role_id = typeof data.role_id != 'undefined' ? data.role_id : 0
      this.rule_id = typeof data.rule_id != 'undefined' ? data.rule_id : 0
    }
  }
  id = 0
  role_id = 0
  rule_id = 0
}