/**
 * Returns non-empty string, e.g. not null, not ''
 * @param str
 * @returns {boolean}
 */
function is_nonempty_str(str) {
    return (typeof str !== "undefined") && (str !== null) &&
        (typeof str.valueOf() === "string") && (str.length > 0);
}

/**
 * @param time
 * @returns moment
 */
function military_time_to_moment(time) {
    if (typeof time!=='string'){
        return false;
    }
    time = time.trim();
    return moment(time, 'hhmma');
}