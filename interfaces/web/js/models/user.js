var UserModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        name : '',
                        last_name : '',
                        login : '',
                        password : '',
                        parent_id : 0,
                        is_group : false,
                        lft : 0,
                        rgt : 0,
                        token : '',
                        is_system : false,
          },
  url: function(){
    return '/api/user/' + this.get('id')
  }
});