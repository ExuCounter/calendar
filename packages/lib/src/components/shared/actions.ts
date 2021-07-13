export type ActionWithPayload<Action extends string, Payload> = Readonly<{ action: Action }> & { payload: Payload }
export type ActionWithoutPayload<Action extends string> = Readonly<{ action: Action }>
