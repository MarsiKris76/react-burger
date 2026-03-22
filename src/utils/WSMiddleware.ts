import {
    type ActionCreatorWithoutPayload,
    type ActionCreatorWithPayload,
    type Dispatch,
    type Middleware,
    type MiddlewareAPI,
    type UnknownAction,
} from '@reduxjs/toolkit';
import {RootState} from "../types/StoreTypes";
import {refreshToken} from "./UserApi";
import {WebSocketOptions} from "../types/ApiTypes";

type WebSocketActions<TMessage> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage: ActionCreatorWithPayload<TMessage>;
    onConnected: ActionCreatorWithPayload<Event>;
    onDisconnected: ActionCreatorWithPayload<CloseEvent>;
    onMessageReceived: ActionCreatorWithPayload<TMessage>;
    onError: ActionCreatorWithPayload<Event>;
};

export function createWebSocketMiddleware<TMessage>(
    {
        connect,
        disconnect,
        sendMessage,
        onConnected,
        onDisconnected,
        onMessageReceived,
        onError,
    }: WebSocketActions<TMessage>,
    { withTokenRefresh }: WebSocketOptions
): Middleware<unknown, RootState, Dispatch<UnknownAction>> {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url: string;

    return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) =>
        (next: Dispatch<UnknownAction>) =>
            (action: UnknownAction) => {
                if (connect.match(action)) {
                    if (socket !== null) {
                        console.warn('WebSocket is already connected.');
                        return;
                    }
                    url = action.payload;
                    socket = new WebSocket(url);
                    isConnected = true;

                    socket.onopen = event => {
                        store.dispatch(onConnected(event));
                    };

                    socket.onclose = event => {
                        store.dispatch(onDisconnected(event));
                        socket = null;

                        if (isConnected) {
                            reconnectTimer = window.setTimeout(() => {
                                store.dispatch(connect(url));
                            }, 3000);
                        }
                    };

                    socket.onmessage = event => {
                        const data = JSON.parse(event.data);
                        store.dispatch(onMessageReceived(data));

                        if (withTokenRefresh && data.message === 'Invalid or missing token') {
                            refreshToken().then(refreshData => {
                                const wssUrl = new URL(url);
                                wssUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
                                store.dispatch(connect(wssUrl.toString()));
                            });

                            store.dispatch(disconnect());
                        }
                    };

                    socket.onerror = event => {
                        store.dispatch(onError(event));
                    };
                }

                if (disconnect.match(action)) {
                    if (socket !== null) {
                        socket.close();
                    }

                    clearTimeout(reconnectTimer);
                    isConnected = false;
                    reconnectTimer = 0;
                    socket = null;
                }

                if (sendMessage.match(action)) {
                    if (socket !== null && socket.readyState === WebSocket.OPEN) {
                        socket.send(JSON.stringify(action.payload));
                    } else {
                        console.warn('WebSocket is not open. Cannot send message.');
                    }
                }

                return next(action);
            }) as Middleware;
}
