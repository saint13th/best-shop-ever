export const websocketsService = (function () {
    const wsAddress = "https://localhost:3000";
    let socket;

    const initSocket = () => {
        socket = io(wsAddress, {
            reconnectionDelayMax: 10000,
        });

        observeSocket();
    }

    const observeSocket = () => {
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
    }

    const closeSocket = () => {
        socket.close();
    }

    return {
        socket,
        initSocket,
        closeSocket,
    }
}())