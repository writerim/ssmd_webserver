var ParameterCollection = Backbone.Collection.extend({
  model: ParameterModel,
});
var ParameterCollectionPages = Backbone.Model.extend({
    default : {
      data : new ParameterCollection(),
      meta : {},
      pages : new PaginationCollection()
    },
    parse: function (response, options) {
      let output = { data: new ParameterCollection(), meta: response.meta, pages: new PaginationCollection() }
      response.data.forEach(d => {
        output.data.add(new ParameterModel(d))
      });
      response.pages.forEach(p => {
        output.pages.add(new PaginationModel(p))
      });
      return output
    },
    url: function () {
      if(!this.attributes.pages){
        return '/api/parameter/all'
        }
      var searchParams = new URLSearchParams(window.location.search);
      searchParams.set("page", this.get('pages').find(p => p.get('is_active')).get('number'));
      return '/api/parameter/all?' + searchParams.toString()
    }
  });