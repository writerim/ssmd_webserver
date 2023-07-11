var UserPlaceModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        plce_id : 0,
                        user_id : 0,
          },
  url: function(){
    return '/api/userplace/' + this.get('id')
  }
});