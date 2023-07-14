var DeviceModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        paren_id : 0,
                        name : '',
                        settings_connections : {},
                        lft : 0,
                        rgt : 0,
                        utc : 0,
                        mod_id : 0,
                        time_settings : {},
                        types : [],
                        status : 0,
                        is_exclude : false,
          },
  url: function(){
    return '/api/device/' + this.get('id')
  }
});