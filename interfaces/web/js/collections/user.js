var UserCollection = Backbone.Collection.extend({
  model: UserModel,
});
var UserCollectionPages = Backbone.Model.extend({
    default : {
      data : new UserCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new UserCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new UserModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/user/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/user/all?' + searchParams.toString()
    }
  });