import { ActionWithPayload, ActionWithoutPayload } from "components/shared/actions";
import { DateNumberType } from "components/Calendar/types";
declare type Actions = ActionWithPayload<"setSelectedDate", {
    date: DateNumberType;
    onChange?: (date: Date) => void;
}> | ActionWithPayload<"setShowingYear", number> | ActionWithPayload<"setShowingMonth", number> | ActionWithoutPayload<"setNextShowingMonth"> | ActionWithoutPayload<"setPreviousShowingMonth">;
export declare type CalendarHookState = {
    handleAction: (action: Actions) => void;
    showingYear: number;
    showingMonth: number;
    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;
    selectedDate: Date;
};
export declare const useCalendar: () => CalendarHookState;
export {};
