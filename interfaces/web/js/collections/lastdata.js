var LastDataCollection = Backbone.Collection.extend({
  model: LastDataModel,
});
var LastDataCollectionPages = Backbone.Model.extend({
    default : {
      data : new LastDataCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new LastDataCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new LastDataModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/lastdata/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/lastdata/all?' + searchParams.toString()
    }
  });