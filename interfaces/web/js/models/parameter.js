var ParameterModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        ident : '',
          },
  url: function(){
    return '/api/parameter/' + this.get('id')
  }
});