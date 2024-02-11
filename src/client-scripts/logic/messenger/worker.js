// import { websocketsService } from '../../services/websocketsService/websocketsService';

// const { socket } = websocketsService;

// addEventListener('message', (event) => {
//     if (event.data.type === 'start') {
//         socket.addEventListener('message', (event) => {
//             postMessage({ type: 'message', payload: event.data })
//         })
//     }

//     if (event.data.type === 'stop') {
//         if (socket) {
//             socket.close();
//         }
//     }
// });