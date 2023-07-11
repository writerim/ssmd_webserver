var RoleRuleModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        role_id : 0,
                        rule_id : 0,
          },
  url: function(){
    return '/api/rolerule/' + this.get('id')
  }
});