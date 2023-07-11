var PaginationView = Backbone.View.extend({
    el: '.pagination',
    template: '#pagination_tpl',
    c: new (Backbone.Model.extend({ center: 0 })),
    model: new PlaceCollectionPages(),
    initialize: function (model) {
        this.model = model
        this.c.set('center', Math.ceil(this.model.get('pages').length / 2))
        let active_number = this.model.get('pages').find(e => e.get('is_active'))
        if (active_number && active_number.get('number') > 3 && active_number.get('number') < this.model.get('pages').length - 3) {
            this.c.set('center', active_number.get('number'))
        }
        this.listenTo(this.c, 'change', this.render)
        this.listenTo(this.model, 'sync', this.render)
        this.render()
    },
    events: {
        "click .prev": 'ToPrev',
        "click .next": 'ToNext',
        "click .pagination_number": 'GoToPage',
    },
    GoToPage: function (e) {
        let click_page = $(e.target).data('page')
        this.model.get('pages').forEach(page => {
            page.set('is_active', false, { silent: true })
        })
        this.model.get('pages').find(page => Number(page.get('number')) == click_page).set('is_active', true)
        this.model.fetch()
    },
    ToPrev: function () {
        if (this.c.get('center') > 1) {
            this.c.set('center', this.c.get('center') - 1)
        }
    },
    ToNext: function () {
        if (this.model.get('pages').length - 4 > this.c.get('center')) {
            this.c.set('center', this.c.get('center') + 1)
        }
    },
    render: function (manufactures) {
        let device_row_tpl = _.template($(this.template).html())

        // Разбираем на 3 части. В каждой части содержится по 3 ссылки
        // Самое простое понимать показывать ли блоки для начала

        let center = []

        if (this.model.get('pages').length > 1) {
            this.model.get('pages').toJSON().forEach((page, i) => {
                if (i < this.c.get('center') - 1 && this.model.get('pages').length - 5 > i) return;
                if (center.length < 5) {
                    center.push(page)
                }
            });
            console.log(center)
        }

        this.$el.html(device_row_tpl({
            center,
        }));

    }
})