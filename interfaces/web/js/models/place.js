var PlaceModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        name : '',
                        parent_id : 0,
                        lft : 0,
                        rgt : 0,
                        icon : '',
                        status : 0,
                        is_exclude : false,
          },
  url: function(){
    return '/api/place/' + this.get('id')
  }
});