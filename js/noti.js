/**
 * class Schedule
 *
 */
class Schedule {
    constructor(start, end, mon_fri) {
        console.log(`sched object initing..`);
        this.start = start;
        this.end = end;
        this.mon_fri = mon_fri;
    }
    mmStart(){
        return moment(this.start, 'HHmm');
    }
}

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
        mon: 98710, tue: 98720, wed: 98730, thu: 98740, fri: 98750, sat: 98760, sun: 98770
        //note, for each day we have two notifications. They will be 98710 and 98711    
    };
    const INDEX_IN_WEEK = {sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6};

    window.noti = {
        plugin: null,
        boot_status: false,
        init: function () {
            if (isInWeb) {
                this.plugin = {
                    schedule: function (args) {
                        console.log(`schedule() in web. does nothing. This is the arguments object:`);
                        console.log(arguments);
                    },
                    getScheduled: function () {
                        return {'mon': {start: 'fake', end: '3:45'}, 'tue': {start: '12:12', end: '13:13'}};
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
         * @param mon_fri e.g. sun mon tue wed thu fri sat. Default to everyday
         * @param start e.g. 23:59
         * @param end e.g. 23:59
         */
        saveSchedule: function (start, end, mon_fri = 'everyday') {
            let schedule = new Schedule(start, end, mon_fri);
            let weekdays = [];
            if (mon_fri === 'everyday') {
                weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            }
            if (typeof mon_fri === 'object' && Array.isArray(mon_fri)) {
                weekdays = mon_fri;
            } else {
                weekdays.unshift(mon_fri);
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
                if (ls(weekday) !== null) {
                    schedules[weekday] = ls(weekday);
                }
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
            let today = moment();//today
            let day_in_week = moment().isoWeekday();//mon = 1, tue = 2
            if (day_in_week === 7) {
                day_in_week = 0;
            }
            let sunday = today.subtract(day_in_week, 'days');
            console.log(`sunday is: ${sunday}`);
            _.each(this.getSchedule(), (day_schedule, mon_fri) => {
                var a = 1;
                let day_to_schedule = _.cloneDeep(sunday);
                day_to_schedule.add(INDEX_IN_WEEK[mon_fri], 'd');
                // day_to_schedule.hour(day_schedule.mmStart().hour());
                this.plugin.schedule({
                    title: 'You are about to go to work',
                    text: 'Because you turned on Auto Commute Log feature, you receive this notification. Please tap to ' +
                        'open the app and your commute will be logged automatically. Thank you',
                    foreground: true,
                    autoClear: false,
                    trigger: {every: 'week'},
                    at: day_to_schedule
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