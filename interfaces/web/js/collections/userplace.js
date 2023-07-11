var UserPlaceCollection = Backbone.Collection.extend({
  model: UserPlaceModel,
});
var UserPlaceCollectionPages = Backbone.Model.extend({
    default : {
      data : new UserPlaceCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new UserPlaceCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new UserPlaceModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/userplace/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/userplace/all?' + searchParams.toString()
    }
  });