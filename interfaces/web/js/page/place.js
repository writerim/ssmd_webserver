$(document).ready(function () {

    const place_collection_page = new PlaceCollectionPages()

    var PlacesView = Backbone.View.extend({
        el: "#places",
        template: '#places_tpl',
        model: place_collection_page,
        initialize: function () {
            this.listenTo(this.model, 'sync', this.render)
            this.listenToOnce(this.model, 'sync', () => { new PaginationView(place_collection_page); })
            this.model.fetch()
            this.render()
        },
        events: {
            "click .add_place": "AddPlace"
        },
        AddPlace: function () {
            new ModalPlaceView(new PlaceModel())
        },
        render: function () {
            let places_tpl = _.template($(this.template).html())
            this.$el.html(places_tpl({
                collection: this.model.get('data') ? this.model.get('data').toJSON() : [],
                place_tpl: _.template($('#place_tpl').html())
            }));
        }
    })

    new PlacesView()
})