const convertDateToUnixTimestamp = (date) => {
    const dateObject = new Date(date);
    const offset = dateObject.getTimezoneOffset() * 60;
    return dateObject.getTime() / 1000 - offset;
}

const convertUnixTimeToDate = (unixTime, timezone) => {
    const dateObject = new Date(unixTime * 1000);
    dateObject.setUTCHours(dateObject.getUTCHours() + timezone / 3600);
    return dateObject;
}

const splitDate = (date) => {
    const dayMonthYear = date.slice(0, 10);
    const hourMinutesSeconds = date.slice(11, 19);
    return dayMonthYear + ' ' + hourMinutesSeconds;
}

const dateFormatter = (cell) => {
    const date = convertUnixTimeToDate(cell, 0);
    return splitDate(date.toISOString().slice(0, 16));
}

export {
    convertDateToUnixTimestamp,
    convertUnixTimeToDate,
    splitDate,
    dateFormatter
};