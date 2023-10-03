module.exports = class BusService{
    constructor( session_signal ){
        this.session_signal = session_signal
    }
    
    // Левая функция передачи
    R = function(){};
    // Правая функция передачи
    L = function(){};

    BufferBusUp = null;
    BufferBusDown = null;
    BufferStorageL = null;
    BufferStorageR = null;
    SettingsPackUp = null;
    SettingsPackDown = null;


}