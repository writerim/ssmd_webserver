var SettingsEnterpriseModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        description : '',
                        index : '',
                        value : '',
          },
  url: function(){
    return '/api/settingsenterprise/' + this.get('id')
  }
});