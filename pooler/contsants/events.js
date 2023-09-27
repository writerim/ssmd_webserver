module.exports = {
    UNBUSY: 'unbussy', // Событие когда устройство освобождается
    SEND_PACK: 'send pack', // Событие когда нужно передать пакет
    PARSE_PACK: 'parse pack', // Событие когда нужно разобрать
    TIMEOUT: 'timeout', // Событие когда было отключение по таймауту
    CLOSE: 'close', // Событие когда было отключение по достижению конца
    ERROR: 'error', // Событие когда было отключение по ошибке
    CONFIRM_ISSUE: 'confirm issue', // событие для подтеверждения того что устройство имеет возможность слушать задачу
    SET_ISSUE: 'set issue', // событие для подтеверждения того что устройство имеет возможность слушать задачу
    SAVE_DATA: 'save data', // сохранение данных
}