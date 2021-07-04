import { useState, useEffect } from "react";
var getMonthCountOfDays = function (month, year) { return new Date(year, month, 0).getDate(); };
var getMonthStartLocalDay = function (month, year) { return new Date(year, month - 1, 1).getDay(); };
export var useMonth = function (month, year) {
    var _a = useState(0), countOfDays = _a[0], setCountOfDays = _a[1];
    var _b = useState(0), startLocalDay = _b[0], setStartLocalDay = _b[1];
    useEffect(function () {
        setCountOfDays(getMonthCountOfDays(month, year));
        setStartLocalDay(getMonthStartLocalDay(month, year));
    }, [setCountOfDays, getMonthCountOfDays, month, year]);
    return {
        countOfDays: countOfDays,
        startLocalDay: startLocalDay,
    };
};
