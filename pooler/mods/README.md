Есть настраиваемые параметры пользователем
Есть то что мы храним у себя неизменяемо

Есть команды которые пользователь вызывать 
Есть команды которые мы только сами можем вызывать. Например настройка соединения

Есть настройки соединений
Скорость биты и тд
Тип подключения



полное имя для библиотеки в БД. Ключ
name = 'empty'

Поля нужные для создания устройства
manufactures = 'empty'
mark = 'empty'
model = 'empty'
series = 'empty'
sowt_version = ''


К каким типам устройств относится прибор
types_device = [
    ELECTRICAL_COUNTER
]

// Какими командами мы моэем читать\ писать
user_commands = [
    {
        export : Bool,
        name : "Получение версии",
        command : "GetVersion"
    }
]

// Системные команды которыми мы можем что то читать писать
system_commands = [

]

// Параметры которые может читать пользователь
user_data_parameters = []

// Системные данные которые мы можем читать и клинту они не нужны. Например промежуточные данные
system_data_parameter = []

// Какие то настройки которые может выставить пользователь
// Тут задержки перед опросом
user_settings_device = {}

// Какие то настройки которые мы прописываем и никак не меняем
// К примеру сюда можно поставить настройки для скорости и тд
system_settings_device = {}


settings_connection = {
	TCP : {
		max_count_connections : 10
	}
	UPD
	
}

parameters = [
	{
		delay : 60 * 60
		cmd : ""
	}
]

export = BOOL // Отдаем ли мы в БД это значение


ARGS
	Ident        string `yaml:"ident" json:"ident"`
	DefaultValue int    `yaml:"default_value" json:"default_value"`
	Placeholder  int    `yaml:"placeholder" json:"placeholder"`
	Format       string `yaml:"format" json:"format"`
	MinLen       int    `yaml:"min_len" json:"min_len"`
	MaxLen       int    `yaml:"max_len" json:"max_len"`
	Regular      string `yaml:"regular" json:"regular"`
	Require      bool   `yaml:"require" json:"require"`
	Legend       string `yaml:"legend" json:"legend"`