/**
 * class Schedule
 *
 */
class Schedule {
    constructor(start, end, mon_fri) {
        this.start = start;
        this.end = end;
        this.mon_fri = mon_fri;
    }

    mmStart() {
        return moment(this.start, 'HHmm');
    }

    mmEnd() {
        return moment(this.end, 'HHmm');
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
                    },
                    getScheduledIds: function () {
                        return 'in browser. Nothing to see here';
                    },
                    cancel: function () {
                        return 'in browser. Nothing to see here';
                    }
                };
            } else {
                try {
                    this.plugin = cordova.plugins.notification.local;
                    if (_.isObject(this.plugin)) {
                        this.boot_status = true;
                    }
                } catch (e) {
                    this.boot_status = false;
                    console.error(e);
                    return false;
                }
            }
            this.boot_status = true;
            //getting commuteData and syncing with schedules
            let commuter_data = ls('commuterData');
            if (_.isObject(commuter_data)) {
                let from_time = _.padStart(commuter_data.fromHRS, 2, '0') + ':' + _.padStart(commuter_data.fromMNS, 2, '0') + commuter_data.fromAMPM;
                let to_time = _.padStart(commuter_data.toHRS, 2, '0') + ':' + _.padStart(commuter_data.toMNS, 2, '0') + commuter_data.toAMPM;
                if (!/\d\d:\d\dA|PM/.test(from_time) || !/\d\d:\d\d:A|PM/.test(to_time)) {
                    console.error(`CommuteData bad data`);
                } else {
                    from_time = moment(from_time, 'HH:mmA');
                    to_time = moment(to_time, 'HH:mmA');
                    /*
                    nice approach: reschedule each one
                    _.forEach(this.getSchedule(), (schedule) => {
                        let schedule_obj = new Schedule(schedule.start, schedule.end, schedule.mon_fri);
                        if (!schedule_obj.mmStart().isSame(from_time)) {
                            console.log(`reschedule start now`);
                        }
                        if (!schedule_obj.mmEnd().isSame(to_time)) {
                            console.log(`reschedule end now`);
                        }
                    });*/
                    this.plugin.cancelAll(() => {
                        this.clearSchedule();
                        // this.saveSchedule(from_time, to_time);//save for everyday
                        //todob
                        this.saveSchedule(from_time, to_time, ['mon', 'wed', 'thu']);//save for wed only
                        this.scheduleNoti();
                    });
                }
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
                weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
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
         * Clear a schedule
         * @param mon_fri e.g. sun mon tue wed thu fri sat. Default to everyday
         * @param start e.g. 23:59
         * @param end e.g. 23:59
         */
        clearSchedule: function (start, end, mon_fri = 'everyday') {
            let schedule = new Schedule(start, end, mon_fri);
            let weekdays = [];
            if (mon_fri === 'everyday') {
                weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
            }
            if (typeof mon_fri === 'object' && Array.isArray(mon_fri)) {
                weekdays = mon_fri;
            } else {
                weekdays.unshift(mon_fri);
            }
            weekdays.forEach((weekday) => {
                ls.remove(weekday);
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
         * Schedule noti for all days. Cancel and re-schedule all notifications
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
            let TODAY = moment();//today
            let day_in_week = moment().isoWeekday();//mon = 1, tue = 2
            if (day_in_week === 7) {
                day_in_week = 0;
            }
            let sunday = _.cloneDeep(TODAY);
            sunday.subtract(day_in_week, 'days');
            _.each(this.getSchedule(), (day_schedule, mon_fri) => {
                let day_to_schedule = _.cloneDeep(sunday);
                let day_schedule_object = new Schedule(day_schedule.start, day_schedule.end, day_schedule.mon_fri);
                day_to_schedule.add(INDEX_IN_WEEK[mon_fri], 'd');
                day_to_schedule.hour(day_schedule_object.mmStart().hour());
                day_to_schedule.minute(day_schedule_object.mmStart().minute());
                /*
                                //todob debug
                                day_to_schedule = moment();
                                day_to_schedule.add(1, 'minute');
                                //end todob debug
                */
                if (day_to_schedule.isBefore(TODAY)) {
                    day_to_schedule.add(7, 'day');
                }

                // this.plugin.cancel(NOTI_IDS[mon_fri]);
                this.plugin.schedule({
                    id: NOTI_IDS[mon_fri],
                    // title: 'You are about to go to work',
                    text: 'testing' + NOTI_IDS[mon_fri],
                    every: 'week',
                    at: day_to_schedule.toDate(),
                    sound: null,
                    icon: 'res://icon',
                    smallIcon: 'res://ic_popup_sync'
                }, () => {
                    console.log(`Scheduled IDs: `);
                    this.plugin.getScheduledIds(this.callbackOpts);
                });

                //now go from Work to Home
                day_to_schedule.hour(day_schedule_object.mmEnd().hour());
                day_to_schedule.minute(day_schedule_object.mmEnd().minute());
                if (day_to_schedule.isBefore(TODAY)) {
                    day_to_schedule.add(7, 'day');
                }
                // this.plugin.cancel(NOTI_IDS[mon_fri] + 1);
                /*this.plugin.schedule({
                    id: NOTI_IDS[mon_fri] + 1,
                    title: 'You are about to go home',
                    text: 'Because you turned on Auto Commute Log feature, you receive this notification. Please tap to ' +
                        'open the app and your commute will be logged automatically. Thank you',
                    every: 'week',
                    at: day_to_schedule.toDate()
                }, null);*/
            });
        },
        getScheduledNoti: function () {
            return this.plugin.getScheduled();
        },
        /**
         * WORK IN PROGRESS
         * Schedule a single noti for a day. to work or to home
         * Also cancel current noti
         * @param start straight from local storage
         * @param end
         * @param mon_fri mon, tue,...
         * @param work_or_home 'work' or 'home'
         */
        /*scheduleNotiSingle(start, end, mon_fri, work_or_home) {
            if (!this.boot_status) {
                return false;
            }
            this.plugin.cancel();
            this.plugin.schedule({
                id: NOTI_IDS[mon_fri] + 1,
                title: 'You are about to go home',
                text: 'Because you turned on Auto Commute Log feature, you receive this notification. Please tap to ' +
                    'open the app and your commute will be logged automatically. Thank you',
                foreground: true,
                autoClear: false,
                trigger: {every: 'week'},
                at: day_to_schedule.toDate()
            });
            console.log(`Scheduled IDs: `);
            console.log(this.plugin.getScheduledIds());
        },*/
        test: function () {
            this.saveSchedule('09:00', '14:41', 'mon');
            this.saveSchedule('11:12', '17:00', 'tue');
            let mon_sched = this.getSchedule('mon');
            // console.log(mon_sched);
            console.log(`Here are the schedules we manually put in for testing`);
            console.log(this.getSchedule());
            console.log(`____________Finish setting up____________`);

            this.scheduleNoti();
            console.log(this.getScheduledNoti());
            console.log(`____________Finish scheduling local noti_____________`);
        },
        callbackOpts: function (notifications) {
            console.log(notifications);
            app_toast(notifications.length === 0 ? '- none -' : notifications.join(' ,'));
        },
        callbackSingleOpts: function (notification) {
            console.log(notification);
            app_toast(notification ? notification.toString() : '- none -');
        }
    };

    /*document.addEventListener('deviceready', () => {
    copy pageload if needed
    }, false);*/
    if (isInWeb) {
        // noti.init();
        // noti.test();
    }

    jQuery(document).on("pageload", function (event) {
        // noti.init();
        // noti.test();
        // console.log(`noti.plugin.getScheduledIds()`);
        // noti.plugin.getScheduledIds();
    });
}());