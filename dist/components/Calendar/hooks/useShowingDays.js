var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { useMonth } from "components/Calendar/hooks/useMonth";
var TOTAL_OF_DAYS_PER_SCREEN = 42; // 42 days per screen
var getPreviousMonthDays = function (_a) {
    var showingYear = _a.showingYear, showingMonth = _a.showingMonth;
    var _b = useMonth(showingMonth - 1, showingYear), countOfDays = _b.countOfDays, startLocalDay = _b.startLocalDay;
    return new Array(startLocalDay).fill(null).map(function (_, idx) {
        return { day: countOfDays - startLocalDay + idx + 1, position: "previous" };
    });
};
var getCurrentMonthDays = function (_a) {
    var showingYear = _a.showingYear, showingMonth = _a.showingMonth;
    var countOfDays = useMonth(showingMonth, showingYear).countOfDays;
    return new Array(countOfDays).fill(null).map(function (_, idx) {
        return { day: idx + 1, position: "current" };
    });
};
var getNextMonthDays = function (_a) {
    var currentMonthCountOfDays = _a.currentMonthCountOfDays, previousMonthCountOfDays = _a.previousMonthCountOfDays;
    var totalDays = TOTAL_OF_DAYS_PER_SCREEN - currentMonthCountOfDays - previousMonthCountOfDays;
    return new Array(totalDays > 0 ? totalDays : 0).fill(null).map(function (_, idx) {
        return { day: idx + 1, position: "next" };
    });
};
export var useShowingDays = function (_a) {
    var showingYear = _a.showingYear, showingMonth = _a.showingMonth;
    var previousMonthDays = getPreviousMonthDays({ showingYear: showingYear, showingMonth: showingMonth });
    var currentMonthDays = getCurrentMonthDays({ showingYear: showingYear, showingMonth: showingMonth });
    var nextMonthDays = getNextMonthDays({
        currentMonthCountOfDays: currentMonthDays.length,
        previousMonthCountOfDays: previousMonthDays.length,
    });
    return __spreadArray(__spreadArray(__spreadArray([], previousMonthDays), currentMonthDays), nextMonthDays);
};
