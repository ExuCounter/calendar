import { useState } from "react";
import { isFunction } from "components/shared/utils";
import { getYear, getMonth, getDay, getDateFromNumbers } from "components/Calendar/utils";
export var useCalendar = function () {
    var date = new Date();
    var _a = useState(getYear(date)), showingYear = _a[0], setShowingYear = _a[1];
    var _b = useState(getMonth(date)), showingMonth = _b[0], setShowingMonth = _b[1];
    var _c = useState(getDay(date)), selectedDay = _c[0], setSelectedDay = _c[1];
    var _d = useState(getMonth(date)), selectedMonth = _d[0], setSelectedMonth = _d[1];
    var _e = useState(getYear(date)), selectedYear = _e[0], setSelectedYear = _e[1];
    var setSelectedDate = function (_a) {
        var date = _a.date, onChange = _a.onChange;
        if (date.month > 12) {
            setNextSelectedYear();
            setNextShowingMonth();
        }
        else if (date.month < 1) {
            setPreviousShowingMonth();
            setPreviousSelectedYear();
        }
        else {
            setSelectedMonth(date.month);
            setSelectedYear(date.year);
            setSelectedDay(date.day);
        }
        isFunction(onChange) && onChange(getDateFromNumbers(date.year, date.month, date.day));
    };
    var setNextSelectedYear = function () {
        setSelectedYear(function (year) { return year + 1; });
        setSelectedMonth(1);
    };
    var setPreviousSelectedYear = function () {
        setSelectedYear(function (year) { return year - 1; });
        setShowingMonth(12);
    };
    var setNextShowingYear = function () {
        setShowingYear(function (year) { return year + 1; });
        setShowingMonth(1);
    };
    var setPreviousShowingYear = function () {
        setShowingYear(function (year) { return year - 1; });
        setShowingMonth(12);
    };
    var setNextShowingMonth = function () {
        var nextMonth = showingMonth + 1;
        if (nextMonth <= 12)
            setShowingMonth(nextMonth);
        if (nextMonth > 12)
            setNextShowingYear();
    };
    var setPreviousShowingMonth = function () {
        var previousMonth = showingMonth - 1;
        if (previousMonth >= 1)
            setShowingMonth(previousMonth);
        if (previousMonth < 1)
            setPreviousShowingYear();
    };
    var handleAction = function (action) {
        switch (action.action) {
            case "setSelectedDate":
                return setSelectedDate(action.payload);
            case "setShowingYear":
                return setShowingYear(action.payload);
            case "setShowingMonth":
                return setShowingMonth(action.payload);
            case "setNextShowingMonth":
                return setNextShowingMonth();
            case "setPreviousShowingMonth":
                return setPreviousShowingMonth();
        }
    };
    return {
        handleAction: handleAction,
        showingYear: showingYear,
        showingMonth: showingMonth,
        selectedDay: selectedDay,
        selectedMonth: selectedMonth,
        selectedYear: selectedYear,
        selectedDate: getDateFromNumbers(selectedYear, selectedMonth - 1, selectedDay),
    };
};
