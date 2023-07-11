var ModCollection = Backbone.Collection.extend({
  model: ModModel,
});
var ModCollectionPages = Backbone.Model.extend({
    default : {
      data : new ModCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new ModCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new ModModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/mod/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/mod/all?' + searchParams.toString()
    }
  });