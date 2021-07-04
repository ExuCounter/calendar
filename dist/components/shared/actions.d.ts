export declare type ActionWithPayload<Action extends string, Payload> = Readonly<{
    action: Action;
}> & {
    payload: Payload;
};
export declare type ActionWithoutPayload<Action extends string> = Readonly<{
    action: Action;
}>;
