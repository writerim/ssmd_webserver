var PlaceTypeCollection = Backbone.Collection.extend({
  model: PlaceTypeModel,
});
var PlaceTypeCollectionPages = Backbone.Model.extend({
    default : {
      data : new PlaceTypeCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new PlaceTypeCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new PlaceTypeModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/placetype/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/placetype/all?' + searchParams.toString()
    }
  });