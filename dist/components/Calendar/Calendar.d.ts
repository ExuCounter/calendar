import React, { PropsWithChildren } from "react";
import "components/Calendar/index.scss";
declare type CalendarProps = PropsWithChildren<{
    show?: boolean;
    onClose: () => void;
    onChange?: (date: Date) => void;
    children?: ((date: Date) => React.ReactElement) | React.ReactNode;
}>;
export declare const Calendar: ({ show, onClose, onChange, children }: CalendarProps) => JSX.Element;
export {};
