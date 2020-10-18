/**
   * Displays a calendar of the current month
   */
function displayCalendar() {
    let date = new Date();
    let month = date.getMonth();
    let year = date.getFullYear();
    id("month").textContent = MONTHS[month];
    let totalDays = daysInMonth(month, year);
    let firstDay = dayOfDate(month, year, 1);
    let lastDay = dayOfDate(month, year, totalDays);
    fillDates(month, year, totalDays, firstDay, 6 - lastDay);
}

/**
 * Fills in the calendar with dates
 * @param {integer} month Current month
 * @param {integer} year Current year
 * @param {integer} totalDays Number of days in current month
 * @param {integer} prevDays Number of days in previous month that will appear on the calendar
 * @param {interger} nextDays Number of days in next month that will appear on the calendar
 */
function fillDates(month, year, totalDays, prevDays, nextDays) {
    let weekNumber = 1;
    let week = id("week1");
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth < 0) {
        prevYear = year - 1;
        prevMonth = 11;
    }
    addFillerDays(daysInMonth(prevMonth, prevYear) - prevDays + 1, prevDays, week);
    for (let i = 1; i <= totalDays; i++) {
        if (week.children.length >= 7) {
            weekNumber++;
            week = id("week" + weekNumber);
        }
        let date = gen("div");
        date.classList.add("date");
        date.addEventListener("click", getSessions);
        let monthZero = "";
        let dayZero = "";
        if (month < 10) {
            monthZero = "0";
        }
        if (i < 10) {
            dayZero = "0";
        }
        date.id = year + "-" + monthZero + (month + 1) + "-" + dayZero + i;
        date.textContent = i;
        week.appendChild(date);
    }
    addFillerDays(1, nextDays, week);
}

/**
 * Adds in dates from other months to the displayed calendar
 * @param {integer} start Start date of the days from other months
 * @param {integer} days Number of days from other months
 * @param {object} week Week on the calendar that the days are added to
 */
function addFillerDays(start, days, week) {
    for (let i = 0; i < days; i++) {
        let date = gen("div");
        date.classList.add("date");
        date.classList.add("prev-next");
        date.textContent = start + i;
        week.appendChild(date);
    }
}

/**
 * Returns the number of days in the given month
 * @param {integer} month Month
 * @param {integer} year Year
 * @returns {integer} Number of days in the given month
 */
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the day of the week of the given date
 * @param {integer} month Month
 * @param {integer} year Year
 * @param {integer} date Date
 * @returns {integer} The day of the week as an integer
 */
function dayOfDate(month, year, date) {
    return new Date(year, month, date).getDay();
}