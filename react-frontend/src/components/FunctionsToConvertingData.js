const convertDateToUnixTimestamp = (date) => {
    return Math.round(date.getTime() / 1000);
}

const convertUnixTimeToDate = (unixTime, timezone) => {
    const dateObject = new Date(unixTime * 1000);
    dateObject.setUTCHours(dateObject.getUTCHours() + timezone / 3600);
    return dateObject;
}

const splitDate = (date) => {
    const dayMonthYear = date.slice(0, 10);
    const hourMinutesSeconds = date.slice(11, 19);
    return dayMonthYear + ", " + hourMinutesSeconds;
}

export {
    convertDateToUnixTimestamp,
    convertUnixTimeToDate,
    splitDate
};