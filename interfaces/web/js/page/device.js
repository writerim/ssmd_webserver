var DeviceTabsModel = Backbone.Model.extend({
    defaults: {
        ident: "",
        name: "",
        type_devices: "",
        is_active: false
    }
})

var DeviceTabsCollection = Backbone.Collection.extend({
    model: DeviceTabsModel
})


var DeviceTabsStep1SettingsModel = Backbone.Model.extend({
    defaults: {
        // какой тип выбран
        // type: "",
        // type_len: 0,
        // Производитель
        manufactures: "",
        manufactures_len: 0,
        // Марка
        mark: "",
        mark_len: 0,
        // Модель
        model: "",
        model_len: 0,
        // Серия
        series: "",
        series_len: 0,
        // Версия софта
        soft_version: "",
        soft_version_len: 0,

        // Текущий шаг
        current_step: 1,
        // Всего шагов. 0 будет врезаться, поэтому + 1
        all_steps: 5,

        current_device: new DeviceModel(),
        current_mod: null
    }
})

let mod_global = new ModCollection()

// Производители
var ModalEditAddDeviceStep1Manufactured = Backbone.View.extend({
    el: "#block_manufactured",
    template: "#manufactured_tpl",
    collection: mod_global,
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.recalc_collection_types)
        this.listenTo(this.settings, 'change', this.recalc_collection_types)
        this.recalc_collection_types();
    },
    events: {
        "change #manufactured": 'ChangeManufacture'
    },
    ChangeManufacture: function (e) {
        if ($(e.target).val()) {
            this.settings.set('manufactures', $(e.target).val())
        }
    },
    recalc_collection_types: function () {
        // let settings_type = this.settings.get('type')
        let manufactures = this.mods.reduce(function (calc, el) {
            // el.get('types_device').forEach(type => {
            if (calc.indexOf(el.get('manufactures')) < 0 && el.get('manufactures')) {
                calc.push(el.get('manufactures'))
            }
            // })
            return calc
        }, [])
        manufactures.sort()
        this.settings.set('manufactures_len', manufactures.length)
        this.render(manufactures)
    },
    render: function (manufactures) {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            manufactures,
            settings: this.settings,
            active: true
        }));

    }
})

var ModalEditAddDeviceStep1Mark = Backbone.View.extend({
    el: "#block_mark",
    template: "#mark_tpl",
    collection: mod_global,
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.recalc_collection_types)
        this.listenTo(this.settings, 'change', this.recalc_collection_types)
        this.recalc_collection_types();
    },
    events: {
        "change #mark": 'ChangeMark'
    },
    ChangeMark: function (e) {
        if ($(e.target).val()) {
            this.settings.set('mark', $(e.target).val())
        }
    },
    recalc_collection_types: function () {
        let settings_type = this.settings.get('type')
        let settings_manufactured = this.settings.get('manufactures')
        let marks = this.mods.reduce(function (calc, el) {
            // el.get('types_device').forEach(type => {
            if (
                // settings_type == type &&
                settings_manufactured == el.get('manufactures') &&
                calc.indexOf(el.get('mark')) < 0 &&
                el.get('mark')) {
                calc.push(el.get('mark'))
            }
            // })
            return calc
        }, [])
        marks.sort()
        this.settings.set('mark_len', marks.length)
        this.render(marks)
    },
    render: function (marks) {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            marks,
            settings: this.settings,
            active: !!this.settings.get('manufactures')
        }));

    }
})

var ModalEditAddDeviceStep1Model = Backbone.View.extend({
    el: "#block_model",
    template: "#model_tpl",
    collection: mod_global,
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.recalc_collection_types)
        this.listenTo(this.settings, 'change', this.recalc_collection_types)
        this.recalc_collection_types();
    },
    events: {
        "change #model": 'ChangeModel'
    },
    ChangeModel: function (e) {
        if ($(e.target).val()) {
            this.settings.set('model', $(e.target).val())
        }
    },
    recalc_collection_types: function () {
        let settings_type = this.settings.get('type')
        let settings_manufactured = this.settings.get('manufactures')
        let settings_mark = this.settings.get('mark')
        let models = this.mods.reduce(function (calc, el) {
            // el.get('types_device').forEach(type => {
            if (
                // settings_type == type &&
                settings_manufactured == el.get('manufactures') &&
                settings_mark == el.get('mark') &&
                calc.indexOf(el.get('model')) < 0 &&
                el.get('model')) {
                calc.push(el.get('model'))
            }
            // })
            return calc
        }, [])
        models.sort()
        this.settings.set('model_len', models.length)
        this.render(models)
    },
    render: function (models) {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            models,
            settings: this.settings,
            active: !!this.settings.get('manufactures') &&
                !!this.settings.get('mark')
        }));

    }
})

var ModalEditAddDeviceStep1Series = Backbone.View.extend({
    el: "#block_series",
    template: "#series_tpl",
    collection: mod_global,
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.recalc_collection_types)
        this.listenTo(this.settings, 'change', this.recalc_collection_types)
        this.recalc_collection_types();
    },
    events: {
        "change #series": 'ChangeSeries'
    },
    ChangeSeries: function (e) {
        if ($(e.target).val()) {
            this.settings.set('series', $(e.target).val())
        }
    },
    recalc_collection_types: function () {
        let settings_type = this.settings.get('type')
        let settings_manufactured = this.settings.get('manufactures')
        let settings_mark = this.settings.get('mark')
        let settings_model = this.settings.get('model')
        let series = this.mods.reduce(function (calc, el) {
            // el.get('types_device').forEach(type => {
            if (
                // settings_type == type &&
                settings_manufactured == el.get('manufactures') &&
                settings_mark == el.get('mark') &&
                settings_model == el.get('model') &&
                calc.indexOf(el.get('series')) < 0 &&
                el.get('series')) {
                calc.push(el.get('series'))
            }
            // })
            return calc
        }, [])
        series.sort()
        this.settings.set('series_len', series.length)
        this.render(series)
    },
    render: function (series) {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            series,
            settings: this.settings,
            active: !!this.settings.get('manufactures') &&
                !!this.settings.get('mark') &&
                !!this.settings.get('model')
        }));

    }
})

var ModalEditAddDeviceStep1SoftVersion = Backbone.View.extend({
    el: "#block_soft_version",
    template: "#soft_version_tpl",
    collection: mod_global,
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.recalc_collection_types)
        this.listenTo(this.settings, 'change', this.recalc_collection_types)
        this.recalc_collection_types();
    },
    events: {
        "change #soft_version": 'ChangeSoftVersion'
    },
    ChangeSoftVersion: function (e) {
        if ($(e.target).val()) {
            this.settings.set('soft_version', $(e.target).val())
        }
    },
    recalc_collection_types: function () {
        // let settings_type = this.settings.get('type')
        let settings_manufactured = this.settings.get('manufactures')
        let settings_mark = this.settings.get('mark')
        let settings_model = this.settings.get('model')
        let settings_series = this.settings.get('series')
        let soft_version = this.mods.reduce(function (calc, el) {
            // el.get('types_device').forEach(type => {
            if (
                // settings_type == type &&
                settings_manufactured == el.get('manufactures') &&
                settings_mark == el.get('mark') &&
                settings_model == el.get('model') &&
                settings_series == el.get('series') &&
                calc.indexOf(el.get('soft_version')) < 0 &&
                el.get('soft_version')) {
                calc.push(el.get('soft_version'))
            }
            // })
            return calc
        }, [])
        soft_version.sort()
        this.settings.set('soft_version_len', soft_version.length)
        this.render(soft_version)
    },
    render: function (soft_version) {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            soft_version,
            settings: this.settings,
            active: !!this.settings.get('manufactures') &&
                !!this.settings.get('mark') &&
                !!this.settings.get('model') &&
                !!this.settings.get('series')
        }));

    }
})

// Блок для вписывания названия в прибор учета
var ModalEditAddDeviceStep2Name = Backbone.View.extend({
    el: "#block_name_device",
    template: "#name_device_tpl",
    collection: mod_global,
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.render)
        this.listenTo(this.settings, 'change', this.render)
        this.render();
    },
    events: {
        "keyup #name_device": 'SetName'
    },
    SetName: function (e) {
        if ($(e.target).val()) {
            let device = this.settings.get('current_device')
            device.set('name', $(e.target).val())
        }
    },

    render: function () {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            settings: this.settings
        }));
    }
})

var ModalEditAddDeviceStep2Parent = Backbone.View.extend({
    el: "#block_parent_device",
    template: "#parent_device_tpl",
    collection: mod_global,
    devices: new DeviceCollection(),
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.devices.fetch()
        this.listenTo(this.mods, 'sync', this.render)
        this.listenTo(this.settings, 'change', this.render)
        this.listenTo(this.devices, 'sync', this.render)
        this.render();
    },
    events: {
        "change #parent_device": 'SetParent'
    },
    SetParent: function (e) {
        if ($(e.target).val()) {
            let device = this.settings.get('current_device')
            device.set('parent_id', Number($(e.target).val()))
        }
    },

    render: function () {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            settings: this.settings,
            devices: this.devices.toJSON()
        }));

    }
})

var ModalEditAddDeviceStep3ConnectionSettings = Backbone.View.extend({
    el: "#block_connection_settings",
    template: "#connection_settings_tpl",
    collection: mod_global,
    devices: new DeviceCollection(),
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.render)
        this.listenTo(this.settings, 'change', this.render)
        this.render();
    },
    events: {
        "keyup input": 'SetData'
    },
    SetData: function (e) {
        if ($(e.target).val()) {
            let id = $(e.target).attr('id')
            let cur_settings = this.settings.get('current_device').get('settings_connections')
            cur_settings[id] = $(e.target).val()
            this.settings.get('current_device').set('settings_connections', cur_settings)
            this.settings.get('current_device').trigger('change:settings_connections')
        }
    },

    render: function () {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            settings: this.settings,
            t_string: _.template($("#connection_settings_string_tpl").html()),
            t_number: _.template($("#connection_settings_number_tpl").html()),
            t_boolean: _.template($("#connection_settings_boolean_tpl").html()),
            t_array: _.template($("#connection_settings_array_tpl").html()),
            t_object: _.template($("#connection_settings_object_tpl").html()),
        }));

    }
})

// Редактирование таймингов
var ModalEditAddDeviceStep4TimerSettings = Backbone.View.extend({
    el: "#block_times",
    template: "#times_tpl",
    collection: mod_global,
    devices: new DeviceCollection(),
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.listenTo(this.mods, 'sync', this.render)
        this.listenTo(this.settings, 'change', this.render)
        this.render();
    },
    events: {
        "keyup #before_connect": 'SetDataBeforeConnect',
        "keyup #before_send": 'SetDataBeforeSend',
        "keyup #await_answer": 'SetDataAwaitAnswer',
    },
    SetDataBeforeConnect: function (e) {
        if ($(e.target).val()) {
            this.settings.get('current_device').set('before_connect', $(e.target).val())
        }
    },
    SetDataBeforeSend: function (e) {
        if ($(e.target).val()) {
            this.settings.get('current_device').set('before_send', $(e.target).val())
        }
    },
    SetDataAwaitAnswer: function (e) {
        if ($(e.target).val()) {
            this.settings.get('current_device').set('await_answer', $(e.target).val())
        }
    },

    render: function () {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            times: this.settings.current_mod.get('times'),
        }));

    }
})


var ModalEditAddDeviceInfoTypes = Backbone.View.extend({
    el: "#block_info_types",
    template: "#info_types_tpl",
    collection: mod_global,
    devices: new DeviceCollection(),
    initialize: function (settings, mods) {
        this.mods = mods
        this.settings = settings
        this.devices.fetch()
        this.listenTo(this.mods, 'sync', this.render)
        this.listenTo(this.settings, 'change', this.render)
        this.render();
    },
    render: function () {
        let device_row_tpl = _.template($(this.template).html())

        var types = []
        var parameters = []
        var commands = []
        if (this.mods && this.mods.length) {
            this.mods.forEach(mod => {

                if (typeof mod.get('soft_version') == "undefined") {
                    mod.set('soft_version', '')
                }

                if (mod.get('manufactures') == this.settings.get('manufactures') &&
                    mod.get('mark') == this.settings.get('mark') &&
                    mod.get('model') == this.settings.get('model') &&
                    mod.get('series') == this.settings.get('series') &&
                    mod.get('soft_version') == String(this.settings.get('soft_version'))
                ) {
                    this.settings.current_mod = mod
                    types = mod.get('types_device')
                    parameters = mod.get('parameters')
                    commands = mod.get('commands')
                }
            })
        }

        types = types.reduce(function (res, el) {
            switch (el) {
                case "electrical_counter":
                    res.push("Электросчетчик")
                    break;
                case "heat_counter":
                    res.push("Теплосчетчик")
                    break;
                case "counter":
                    res.push("Считыватель")
                    break;
                case "converter":
                    res.push("Конвертер")
                    break;
                case "concentrator":
                    res.push("Концентратор")
                    break;
                case "water_counter":
                    res.push("Водосчетчик")
                    break;
            }
            return res
        }, [])

        parameters = parameters.reduce(function (res, el) {
            switch (el.ident) {
                case "ENERGY_ACTIVE_TARIF_1":
                    res.push("Энергия тариф 1")
                    break;
                case "ENERGY_ACTIVE_TARIF_2":
                    res.push("Энергия тариф 2")
                    break;
                case "ENERGY_ACTIVE_TARIF_SUM":
                    res.push("Энергия сумма тарифов")
                    break;
            }
            return res
        }, [])

        commands = commands.reduce(function (res, el) {
            switch (el.ident) {
                case "get_data":
                    res.push("Получение текущих данных по расписанию")
                    break;
                case "get_rele_status":
                    res.push("Получение статиуса реле")
                    break;
            }
            return res
        }, [])

        this.$el.html(device_row_tpl({
            types,
            parameters,
            commands
        }));

    }
})


var ModalEditButtons = Backbone.View.extend({
    el: "#buttons",
    template: "#buttons_tpl",
    initialize: function (settings) {
        this.settings = settings
        this.listenTo(this.settings, "change", this.render)
        this.listenTo(this.settings.get('current_device'), "change", this.render)
        this.listenTo(this.settings.get('current_device'), "change:settings_connections", this.render)
        // this.listenTo(this.settings.get('current_device'), "change", this.render)
        this.render()
    },
    events: {
        "click .buttonNext": 'NextStep',
        "click .buttonPrevious": 'PrevStep',
        "click .buttonSave": 'Save',
    },
    NextStep: function (e) {
        this.settings.set('current_step', this.settings.get('current_step') + 1)
    },
    PrevStep: function (e) {
        this.settings.set('current_step', this.settings.get('current_step') - 1)
    },
    Save: function (e) {
        this.settings.get('current_device').set('mod_id', this.settings.current_mod.get('id'))
        this.settings.get('current_device').set('time_settings', this.settings.current_mod.get('times'))
        this.settings.get('current_device').set('types', this.settings.current_mod.get('types_device'))
        this.settings.get('current_device').save()
    },
    render: function () {
        let device_row_tpl = _.template($(this.template).html())

        let is_valid_step_1 = function (settings) {
            if (settings.get('current_step') == 1) {
                if (!settings.get('manufactures_len')) return true
                if (!settings.get('manufactures')) return false
                if (!settings.get('mark_len')) return true
                if (!settings.get('mark')) return false
                if (!settings.get('model_len')) return true
                if (!settings.get('model')) return false
                if (!settings.get('series_len')) return true
                if (!settings.get('series')) return false
                if (!settings.get('soft_version_len')) return true
                if (!settings.get('soft_version')) return false
            } else if (settings.get('current_step') == 2) {
                if (!settings.get('current_device').get('name')) return false
                return true
            } else if (settings.get('current_step') == 4) {
                return true
            } else if (settings.get('current_step') == 3) {
                // Проверяем все настройки
                // 0 -ничего
                // 1 - не валидно
                // 2 - валидно
                let res_valid = 0
                settings.current_mod.get('device_parameters').forEach(parameter => {
                    if (res_valid == 1) return
                    let index = parameter.ident
                    let value = settings.get('current_device').get('settings_connections')[index]
                    if (!value) return false
                    if (parameter.regular) {
                        let res = value.match(parameter.regular)
                        if (res.length && res[0] == value) {
                            res_valid = 2
                        } else {
                            res_valid = 1
                            return
                        }
                    }


                    // max_len: 
                    // min_len
                    if (parameter.max_len.format == "string") {
                        if (parameter.max_len && parameter.max_len < value.length) {
                            res_valid = 1
                        }
                        if (parameter.min_len && parameter.min_len >= value.length) {
                            res_valid = 1
                        }
                    }

                    if (parameter.max_len.format == "number") {
                        if (parameter.max_len && parameter.max_len < Number(value)) {
                            res_valid = 1
                        }
                        if (parameter.min_len && parameter.min_len >= Number(value)) {
                            res_valid = 1
                        }
                    }
                    return res_valid
                })
                return res_valid == 2
            }
        }(this.settings)
        this.$el.html(device_row_tpl({
            settings: this.settings,
            is_valid_step_1,
            is_prev: false
        }));
    }
})


var ModalEditAddDeviceConteiner = Backbone.View.extend({
    el: "#stepContainer",
    template: "#modal_device_step_1",
    mods: new ModCollection(),
    initialize: function (device_model, settings) {
        this.model = device_model
        this.settings = settings
        this.listenTo(this.settings, 'change:current_step', this.render)
        this.mods.fetch()
        this.render();
    },
    render: function () {
        this.template = "#modal_device_step_" + this.settings.get('current_step')
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            device: this.model,
        }));
        // Создаем типы
        if (this.settings.get('current_step') == 1) {
            new ModalEditAddDeviceStep1Manufactured(this.settings, this.mods)
            new ModalEditAddDeviceStep1Mark(this.settings, this.mods)
            new ModalEditAddDeviceStep1Model(this.settings, this.mods)
            new ModalEditAddDeviceStep1Series(this.settings, this.mods)
            new ModalEditAddDeviceStep1SoftVersion(this.settings, this.mods)
            new ModalEditAddDeviceInfoTypes(this.settings, this.mods)
        } else if (this.settings.get('current_step') == 2) {
            new ModalEditAddDeviceStep2Name(this.settings, this.mods)
            new ModalEditAddDeviceStep2Parent(this.settings, this.mods)
        } else if (this.settings.get('current_step') == 3) {
            new ModalEditAddDeviceStep3ConnectionSettings(this.settings, this.mods)
        } else if (this.settings.get('current_step') == 4) {
            new ModalEditAddDeviceStep4TimerSettings(this.settings, this.mods)
        }
    }
})

var ModalEditAddDeviceNavigation = Backbone.View.extend({
    el: "#navigation_edit_add_device",
    template: "#navigation_edit_add_device_tpl",
    initialize: function (settings) {
        this.settings = settings
        this.listenTo(this.settings, 'change:current_step', this.render)
        this.render();
    },
    render: function () {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.html(device_row_tpl({
            settings: this.settings,
        }));
    }
})

var ModalEditAddDevice = Backbone.View.extend({
    el: "#device_panel",
    template: "#device_modal_tpl",
    settings: new DeviceTabsStep1SettingsModel({ current_device: new DeviceModel() }),
    initialize: function (device_model) {
        this.model = device_model
        this.render();
    },
    events: {
        "click .close": "Close",
        "click .buttonSave": "Close"
    },
    Close: function () {
        $(this.$el).find('.modal').remove()
    },
    render: function () {
        let device_row_tpl = _.template($(this.template).html())
        this.$el.append(device_row_tpl({
            device: new DeviceModel(this.model),
            settings: this.settings,
        }));
        new ModalEditAddDeviceConteiner(this.model, this.settings)
        new ModalEditButtons(this.settings)
        new ModalEditAddDeviceNavigation(this.settings)
    }
})

var DevicePage = Backbone.View.extend({
    el: "#device_panel",
    template: "#device_panel_tpl",
    collection: new DeviceCollection(),
    tabs: new DeviceTabsCollection([
        new DeviceTabsModel({ ident: "converter", name: "Конверторы", is_active: true }),
        new DeviceTabsModel({ ident: "concentrator", name: "Концентраторы" }),
        new DeviceTabsModel({ ident: "electrical_counter", name: "Электросчетчики" }),
        new DeviceTabsModel({ ident: "water_counter", name: "Водосчетчики" }),
        new DeviceTabsModel({ ident: "heat_counter", name: "Теплосчетчики" }),
    ]),
    events: {
        "click .tab_device": 'TabClick',
        "click .add_device": 'AddDevice'
    },
    TabClick: function (e) {
        let curent_tab = $(e.target).closest('.tab_device')
        let data_tab_ident = $(curent_tab).data('ident')
        this.tabs.forEach(function (tab) {
            tab.set('is_active', data_tab_ident == tab.get('ident'), { silent: true })
        })
        this.tabs.trigger('change')
    },
    AddDevice: function (e) {
        new ModalEditAddDevice(new DeviceModel())
    },
    initialize: function () {
        this.base_url_collection = this.collection.url += "/"

        var self = this

        this.listenTo(this.collection, "sync", this.render)
        this.listenTo(this.tabs, "change", this.render)
        this.listenTo(this.tabs, "change", function () {
            self.collection.url = self.base_url_collection + self.tabs.toJSON().find(t => t.is_active).ident
            self.collection.fetch()
        })
        this.collection.url = this.base_url_collection + this.tabs.find(t => t.get('is_active')).get('ident')
        this.collection.fetch()
    },
    render: function () {
        let tmpl = _.template($(this.template).html())
        let device_row_tpl = _.template($("#device_row_tpl").html())
        this.$el.html(tmpl({
            devices: this.collection.toJSON(),
            device_row_tpl,
            tabs: this.tabs.toJSON(),
        }));
    }
})

$(document).ready(function () {
    new DevicePage()
})