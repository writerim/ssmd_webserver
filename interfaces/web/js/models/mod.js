var ModModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        name : '',
                        manufactures : '',
                        mark : '',
                        model : '',
                        series : '',
                        sowt_version : '',
                        types_device : [],
                        lib : '',
                        parameters : [],
                        commands : [],
                        lib_description : {},
                        commands : [],
          },
  url: function(){
    return '/api/mod/' + this.get('id')
  }
});