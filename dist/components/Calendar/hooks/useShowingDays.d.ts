export declare type DayPosition = "previous" | "current" | "next";
export declare const useShowingDays: ({ showingYear, showingMonth }: {
    showingYear: number;
    showingMonth: number;
}) => {
    day: number;
    position: DayPosition;
}[];
