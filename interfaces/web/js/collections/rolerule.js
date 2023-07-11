var RoleRuleCollection = Backbone.Collection.extend({
  model: RoleRuleModel,
});
var RoleRuleCollectionPages = Backbone.Model.extend({
    default : {
      data : new RoleRuleCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new RoleRuleCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new RoleRuleModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/rolerule/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/rolerule/all?' + searchParams.toString()
    }
  });