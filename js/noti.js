(function () {
    "use strict";
    /**
     * Manage notifications
     * noti means Local Notification
     * This app manage local notifications
     * It saves/reads from local storage
     * Keeps track of current local notifications
     * Updates them, cancel them based on new FlexTime
     * @type {{init: noti.init}}
     */
    const NOTI_IDS = {
        mon: 98761, tue: 98762, wed: 98763, thu: 98764, fri: 98765, sat: 98766, sun: 98767
    };
    window.noti = {
        plugin: null,
        boot_status: false,
        init: function () {
            if (isInWeb) {
                this.plugin = {
                    schedule: function () {
                        console.log(`schedule() in web. does nothing.`);
                    }
                };
                this.boot_status = true;
                return;
            }
            try {
                this.plugin = cordova.plugins.notification.local;
            } catch (e) {
                this.boot_status = false;
                console.error(e);
            }
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
            } else {
                weekdays.unshift(weekday);
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
            let input_is_array = (Array.isArray(weekday) || weekday === 'everyday');
            if (input_is_array) {
                weekdays = weekday;
            } else {
                weekdays.unshift(weekday);
            }
            if (weekday === 'everyday') {
                weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            }
            weekdays.forEach((weekday) => {
                schedules[weekday] = ls(weekday);
            });
            if (!input_is_array) {
                schedules = schedules[weekday];
            }
            return schedules;
        },
        /**
         * Schedule noti for all days
         * Available actions:
         * schedule    cancelAll    isTriggered    get    getDefaults
         update    hasPermission    getType    getAll    setDefaults
         clear    requestPermission    getIds    getScheduled    on
         clearAll    isPresent    getScheduledIds    getTriggered    un
         cancel    isScheduled    getTriggeredIds    addActionGroup
         * @return boolean
         */
        scheduleNoti: function () {
            if (!this.boot_status) return false;
            this.getSchedule().each((day_schedule) => {
                this.plugin.schedule({
                    title: 'You are about to go to work',
                    text: 'Because you turned on Auto Commute Log feature, you receive this notification. Please tap to ' +
                        'open the app and your commute will be logged automatically. Thank you',
                    foreground: true,
                    autoClear: false,
                    trigger: {every: 'week'}
                });
            });
        },
        getScheduledNoti: function () {
            return this.plugin.getScheduled();
        },
        test: function () {
            this.saveSchedule('8:9', '07:35', 'mon');
            this.saveSchedule('11:12', '09:35', 'tue');
            let mon_sched = this.getSchedule('mon');
            console.log(mon_sched);
            console.log(this.getSchedule());

            this.scheduleNoti();
            console.log(this.getScheduledNoti());
        }
    };

    noti.init();
    noti.test();
}());