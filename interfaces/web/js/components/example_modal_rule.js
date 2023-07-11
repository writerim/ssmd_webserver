const ModalRuleView = Backbone.View.extend({
    el : "body",
    template : "#modal_rule_tpl",
    initialize : function(model,title = ''){
        this.model = model
        this.title = title
        this.render()
    },
    render : function(){
        let tpl = _.template($(this.template).html())
        this.$el.append(tpl({
            model: this.model.toJSON(),
            modal_title : this.title
        }));
    }
})