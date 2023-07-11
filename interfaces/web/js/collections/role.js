var RoleCollection = Backbone.Collection.extend({
  model: RoleModel,
});
var RoleCollectionPages = Backbone.Model.extend({
    default : {
      data : new RoleCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new RoleCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new RoleModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/role/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/role/all?' + searchParams.toString()
    }
  });