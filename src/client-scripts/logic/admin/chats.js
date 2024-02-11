import { websocketsService } from '../../services/websocketsService/websocketsService';

(function(){
    const { socket } = websocketsService;

    window.addEventListener("load", async (event) => {
        if (location.pathname === "/admin/chats") {
            const searchParams = new URLSearchParams(location.search);

            if (searchParams.has("room")) {
                socket.emit('joinRoom', searchParams.get('room'));
            }
        }
    });
}())