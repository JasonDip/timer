import moment from "moment";

export function getEndTime(time, addDurationMs) {
    let endTime = moment(time).add(addDurationMs, "ms");

    // only show full format if day/month/year changes
    let formatString = ""; // full format is "MMM DD, YYYY - hh:mm:ss A"
    const now = moment().format();
    if (
        moment(now).month() !== moment(endTime).month() ||
        moment(now).day() !== moment(endTime).day() ||
        moment(now).year() !== moment(endTime).year()
    ) {
        formatString += "MMM DD, YYYY - ";
    }
    formatString += "H:mm:ss A";

    return endTime.format(formatString);
}

export function formatMilliseconds(milliseconds) {
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let minutes = Math.floor(milliseconds / (1000 * 60)) - hours * 60;
    let seconds = milliseconds / 1000 - hours * 60 * 60 - minutes * 60;

    let time = "";
    if (hours > 0) {
        time = time.concat(hours.toString().padStart(2, "0"), ":");
    }
    time = time.concat(
        minutes.toString().padStart(2, "0"),
        ":",
        seconds.toString().padStart(2, "0")
    );

    return time;
}
