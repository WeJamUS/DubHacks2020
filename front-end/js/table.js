displayWeek();
        function displayWeek() {
            let date = getSunday();
            let day = date.getDate();
            let month = date.getMonth();
            let year = date.getYear() - 100;
            //let year = date.getFullYear();
            //id("month").textContent = MONTHS[month];
            // let firstDay = dayOfDate(month, year, 1);
            // let lastDay = dayOfDate(month, year, totalDays);
            //fillDates(month, year, totalDays, firstDay, 6 - lastDay);
            let nextWeek = getNextSunday(year, month, day);
            document.getElementById("date").innerHTML = (month + 1) + "/" + (day) + " - " + (nextWeek.getMonth() + 1) + "/" + (nextWeek.getDate());
        }

        function displayNextWeek() {
            let sunday = getNextWeek();
        }

        function getSunday() {
            let date = new Date();
            let month = date.getMonth();
            let daysAhead = date.getDay();
            let year = date.getYear() - 100;
            let day = date.getDate() - daysAhead;
            if (day < 1) {
                month = month - 1;
                if (month < 0) {
                    year = year - 1
                }
                day = day + daysInMonth[month]
            }
            return new Date(year, month, day);
        }
        /**
         * Calculates the numeric date for next week
         * @param {integer} month Current month
         * @param {integer} totalDays Number of days in current month
         * @param {integer} prevDays Number of days in previous month that will appear on the calendar
         * @param {interger} nextDays Number of days in next month that will appear on the calendar
         */
        function getNextSunday(year, month, day){
            day = day + 6;
            if (day > daysInMonth[month]) {
                day = day - daysInMonth[month];
                month = month + 1;
            }
            if (month > 11) {
                month = month -12;
                year = year + 1;
            }
            nextWeek = new Date(year, month, day);
            return nextWeek;
        }