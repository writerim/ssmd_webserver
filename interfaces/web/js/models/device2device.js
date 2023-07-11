var Device2DeviceModel = Backbone.Model.extend({
  defaults : {
                    id : 0,
                        device_id : 0,
                        parameter_id : 0,
                        device_donor_id : 0,
                        parameter_donor_id : 0,
          },
  url: function(){
    return '/api/device2device/' + this.get('id')
  }
});