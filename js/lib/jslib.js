/**
 * Returns non-empty string, e.g. not null, not ''
 * @param str
 * @returns {boolean}
 */
function is_nonempty_str(str) {
    return (typeof str !== "undefined") && (str !== null) &&
        (typeof str.valueOf() === "string") && (str.length > 0);
}
