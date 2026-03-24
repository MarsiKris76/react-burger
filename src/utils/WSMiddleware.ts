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
import {wsConnecting} from "../services/slices/FeedSlice";

type WebSocketActions<TMessage> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage: ActionCreatorWithPayload<TMessage>;
    onConnected: ActionCreatorWithoutPayload;
    onDisconnected: ActionCreatorWithoutPayload;
    onMessageReceived: ActionCreatorWithPayload<TMessage>;
    onError: ActionCreatorWithoutPayload;
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
                    store.dispatch(wsConnecting());
                    url = action.payload;
                    socket = new WebSocket(url);
                    isConnected = true;

                    socket.onopen = () => {
                        store.dispatch(onConnected());
                    };

                    socket.onclose = () => {
                        store.dispatch(onDisconnected());
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

                    socket.onerror = () => {
                        store.dispatch(onError());
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
