// generated May 18, 2023

/**
 * @openapi
 * components:
 *   schemas:
 *      RoleRule:
 *       type: object
 *       description: Права доступа роли
 *       properties:
 *         id: 
 *           type: int
 *           example: 15
 *         message_id: 
 *           type: int
 *           example: 10
 *           description: Идентификатор сообщения, которое будем отправлять
 *         cron_id: 
 *           type: int
 *           example: 12
 *           description: Идентификатор смены для которой будем отправлять
 *         is_after_start_duty: 
 *           type: bool
 *           example: false
 *           description: Отправлять после начала смены?
 *         year: 
 *           type: int
 *           example: 0
 *           description: Сколько отступить лет от метки времени
 *         month: 
 *           type: int
 *           example: 0
 *           description: Сколько отступить месяцев от метки времени
 *         day: 
 *           type: int
 *           example: 0
 *           description: Сколько отступить дней от метки времени
 *         hour: 
 *           type: int
 *           example: 0
 *           description: Сколько отступить часов от метки времени
 *         min: 
 *           type: int
 *           example: 0
 *           description: Сколько отступить минут от метки времени
 */

module.exports = class RoleRule {
    constructor(data) {
                    this.id = data.id;
                    this.role_id = data.role_id;
                    this.rule_id = data.rule_id;
            }
            id = 0;
            role_id = 0;
            rule_id = 0;
    }