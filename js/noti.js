/**
 * Manage notifications
 * This app manage local notifications
 * It saves/reads from local storage
 * Keeps track of current local notifications
 * Updates them, cancel them based on new FlexTime
 * @type {{init: noti.init}}
 */
noti = {
    init: function () {

    },
    /**
     * Save a schedule
     * @param weekday e.g. sun mon tue wed thu fri sat. Default to everyday
     * @param start e.g. 23:59
     * @param end e.g. 23:59
     */
    saveSchedule: function (start, end, weekday = 'everyday') {
        let schedule = {start, end};
        let weekdays = [];
        if (weekday === 'everyday') {
            weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        }
        if (typeof weekday === 'object' && Array.isArray(weekday)) {
            weekdays = weekday;
        }
        weekdays.forEach((weekday) => {
            ls(weekday, schedule);
        });
    },
    /**
     * Get a schedule or some schedules
     * @param weekday string/array
     * @returns {*}
     */
    getSchedule: function (weekday = 'everyday') {
        let schedules = {};
        let weekdays = [];
        let input_is_array = typeof weekday === 'object' && Array.isArray(weekday);
        if (weekday === 'everyday') {
            weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
        }
        if (input_is_array) {
            weekdays = weekday;
        } else {
            weekdays.unshift(weekday);
        }
        weekdays.forEach((weekday) => {
            schedules[weekday] = ls(weekday);
        });
        if (!input_is_array) {
            schedules = schedules[weekday];
        }
        return schedules;
    },
    test: function () {
        this.saveSchedule('11:12', '09:35', 'mon');
        this.saveSchedule('11:12', '09:35', 'tue');
        let mon_sched = this.getSchedule('mon');
        //console.log(mon_sched);
        window.mon_sched = mon_sched;
    }
};

noti.init();
noti.test();
