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
    formatString += "hh:mm:ss A";

    return endTime.format(formatString);
}
