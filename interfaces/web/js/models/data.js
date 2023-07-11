var DataModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        device_id : 0,
                        parameter_id : 0,
                        data : {},
                        date : new Date(),
          },
  url: function(){
    return '/api/data/' + this.get('id')
  }
});