import { fetchService } from '../../services/fetchService/fetchService';
import { websocketsService } from '../../services/websocketsService/websocketsService';

(function () {
    let user = null;
    const sendMessageButton = document.querySelector('#sendMessageButton');
    const { socket } = websocketsService;

    socket.on("chatToClient", (data) => {
        const { type, message } = data;
        const messages = document.querySelector('#messages');
        const skeletonsWrapper = document.querySelector('#hiddenMessages');

        if (type === 'user') {
            const emptydiv = document.createElement('div');
            const userMessageSkeleton = skeletonsWrapper.querySelector('.user-message');

            emptydiv.innerHTML = userMessageSkeleton.innerHTML;
            emptydiv.querySelector('.user-message-value').innerHTML = message;
            messages.appendChild(emptydiv);
        }

        if (type === 'manager') {
            const emptydiv = document.createElement('div');
            const mangerMessageSkeleton = skeletonsWrapper.querySelector('.manager-message');

            emptydiv.innerHTML = mangerMessageSkeleton.innerHTML;
            emptydiv.querySelector('.manager-message-value').innerHTML = message;
            messages.appendChild(emptydiv);
        }

        (document.querySelector('#messageInput') as HTMLInputElement).value = '';
    });


    const joinRoom = async () => {
        try {
            const { result, error } = await fetchService.get({ url: 'auth/profile' });

            if (result) {
                user = { ...result }
            }

            if (user?.email) {
                socket.emit('joinRoom', user.email);
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const sendMessage = async () => {
        const messageInputValue = (document.querySelector('#messageInput') as HTMLInputElement).value;

        if (location.pathname === '/messenger') {
            socket.emit('chatToServer', {
                message: messageInputValue,
            });
        }

        if (location.pathname === '/admin/chats') {
            const searchParams = new URLSearchParams(location.search);

            socket.emit('chatToServer', {
                message: messageInputValue,
                room: searchParams.get('room')
            });
        }

    }

    window.addEventListener("load", async (event) => {
        if (location.pathname === '/messenger') {
            await joinRoom();
        }
    });

    sendMessageButton && sendMessageButton.addEventListener('click', async () => {
        await sendMessage();
    })
}())