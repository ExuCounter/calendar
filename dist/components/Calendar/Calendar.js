var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarContextProvider } from "components/Calendar/CalendarContext";
import { getLocalDayName, getMonthName } from "components/Calendar/utils";
import { useCalendar } from "components/Calendar/hooks/useCalendar";
import { useShowingDays } from "components/Calendar/hooks/useShowingDays";
import LeftArrowIcon from "misc/icons/left-arrow.svg";
import RightArrowIcon from "misc/icons/right-arrow.svg";
import { isFunction } from "components/shared/utils";
import "components/Calendar/index.scss";
var CONTAINER_WIDTH = 244; //px
var COL_WIDTH = CONTAINER_WIDTH / 7; // 7 days in week
var Navigation = function (_a) {
    var showingYear = _a.showingYear, showingMonth = _a.showingMonth, handleAction = _a.handleAction;
    return (_jsxs("div", __assign({ className: "calendar-navigation" }, { children: [_jsxs("div", __assign({ className: "flex" }, { children: [_jsx("span", __assign({ className: "calendar-navigation__month" }, { children: getMonthName(showingMonth) }), void 0),
                    _jsx("span", __assign({ className: "calendar-navigation__year" }, { children: showingYear }), void 0)] }), void 0),
            _jsxs("div", __assign({ className: "flex" }, { children: [_jsx("button", __assign({ className: "calendar-navigation__btn", onClick: function () { return handleAction({ action: "setPreviousShowingMonth" }); } }, { children: _jsx(LeftArrowIcon, {}, void 0) }), void 0),
                    _jsx("button", __assign({ className: "calendar-navigation__btn", onClick: function () { return handleAction({ action: "setNextShowingMonth" }); } }, { children: _jsx(RightArrowIcon, {}, void 0) }), void 0)] }), void 0)] }), void 0));
};
var LocalDays = function () { return (_jsx("div", __assign({ className: "local-days" }, { children: [0, 1, 2, 3, 4, 5, 6].map(function (day, idx) { return (_jsx("div", __assign({ className: "local-days__name", style: { width: COL_WIDTH } }, { children: getLocalDayName(day, true) }), idx)); }) }), void 0)); };
var Days = function (_a) {
    var showingYear = _a.showingYear, showingMonth = _a.showingMonth, selectedMonth = _a.selectedMonth, selectedDay = _a.selectedDay, selectedYear = _a.selectedYear, onClose = _a.onClose, onChange = _a.onChange, handleAction = _a.handleAction;
    var showingDays = useShowingDays({ showingYear: showingYear, showingMonth: showingMonth });
    var getClassName = function (position, day) {
        var isActive = showingYear === selectedYear && showingMonth === selectedMonth && selectedDay === day;
        var isCurrentPosition = position === "current";
        return "days-item " + position + " " + (isActive && isCurrentPosition ? "active" : "");
    };
    var getHandler = function (position, day) {
        switch (position) {
            case "previous":
                return function () {
                    handleAction({
                        action: "setSelectedDate",
                        payload: { date: { year: showingYear, month: showingMonth + 1, day: day }, onChange: onChange },
                    });
                    handleAction({ action: "setPreviousShowingMonth" });
                };
            case "current":
                return function () {
                    handleAction({
                        action: "setSelectedDate",
                        payload: { date: { year: showingYear, month: showingMonth, day: day }, onChange: onChange },
                    });
                };
            case "next":
                return function () {
                    handleAction({
                        action: "setSelectedDate",
                        payload: { date: { year: showingYear, month: showingMonth - 1, day: day }, onChange: onChange },
                    });
                    handleAction({ action: "setNextShowingMonth" });
                };
        }
    };
    return (_jsx("div", __assign({ className: "days-container" }, { children: showingDays.map(function (_a, idx) {
            var day = _a.day, position = _a.position;
            var handler = getHandler(position, day);
            var className = getClassName(position, day);
            return (_jsx("div", __assign({ className: "days-item__container", style: { minWidth: COL_WIDTH, width: COL_WIDTH } }, { children: _jsx("button", __assign({ className: className, onClick: function () {
                        handler();
                        onClose();
                    } }, { children: day }), void 0) }), idx));
        }) }), void 0));
};
export var Calendar = function (_a) {
    var _b = _a.show, show = _b === void 0 ? true : _b, onClose = _a.onClose, onChange = _a.onChange, children = _a.children;
    var _c = useCalendar(), showingYear = _c.showingYear, showingMonth = _c.showingMonth, selectedDay = _c.selectedDay, selectedMonth = _c.selectedMonth, selectedYear = _c.selectedYear, selectedDate = _c.selectedDate, handleAction = _c.handleAction;
    return (_jsx("div", __assign({ className: "calendar-container" }, { children: _jsxs(CalendarContextProvider, __assign({ value: selectedDate }, { children: [_jsx("div", __assign({ className: "calendar-children" }, { children: children && isFunction(children) ? children(selectedDate) : children }), void 0),
                show && (_jsx("div", __assign({ className: "calendar calendar-placement-left" }, { children: _jsxs("div", __assign({ style: { width: CONTAINER_WIDTH } }, { children: [_jsx(Navigation, { showingYear: showingYear, showingMonth: showingMonth, handleAction: handleAction }, void 0),
                            _jsx(LocalDays, {}, void 0),
                            _jsx(Days, { showingYear: showingYear, showingMonth: showingMonth, selectedMonth: selectedMonth, selectedDay: selectedDay, selectedYear: selectedYear, handleAction: handleAction, onClose: onClose, onChange: onChange }, void 0)] }), void 0) }), void 0))] }), void 0) }), void 0));
};
