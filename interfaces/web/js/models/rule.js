var RuleModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        name : '',
                        description : '',
          },
  url: function(){
    return '/api/rule/' + this.get('id')
  }
});