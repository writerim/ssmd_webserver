var RoleModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        name : '',
                        description : '',
          },
  url: function(){
    return '/api/role/' + this.get('id')
  }
});