import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketService {
    private readonly connectedClients: Map<string, Socket> = new Map();

    handleConnection(socket: Socket): void {
        const clientId = socket.id;

        console.log({ clientId });

        this.connectedClients.set(clientId, socket);

        socket.on('disconnect', () => {
            this.connectedClients.delete(clientId);
        });
    }
}