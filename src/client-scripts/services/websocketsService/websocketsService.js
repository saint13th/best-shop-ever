import { io } from 'socket.io-client';

export const websocketsService = (function () {
    const wsAddress = "wss://localhost:3000";
    const socket = io(wsAddress, {
        reconnectionDelayMax: 10000,
        transports: ['websocket', 'polling'],
    });

    socket.io.on("error", (error) => {
        console.log({ error });
    });

    socket.io.on("ping", () => {
        console.log('ping');
    });

    socket.io.on("reconnect", (attempt) => {
        console.log({ attempt });
    });

    socket.io.on("reconnect_attempt", (attempt) => {
        console.log({ attempt });
    });

    socket.io.on("reconnect_error", (error) => {
        console.log({ error });
    });

    socket.io.on("reconnect_failed", () => {
        console.log('reconnect_failed');
    });

    return {
        socket,
    }
}())