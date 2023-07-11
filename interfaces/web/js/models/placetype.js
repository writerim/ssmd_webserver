var PlaceTypeModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        ident : '',
                        icon : '',
          },
  url: function(){
    return '/api/placetype/' + this.get('id')
  }
});