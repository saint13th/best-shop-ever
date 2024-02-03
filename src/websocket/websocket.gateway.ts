import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }

  afterInit(server: Server) {
    console.log('websockets inited');
  }
  
  handleDisconnect(client: Socket) {
    console.log(`websockets disconnected: ${client.id}`);
  }
  
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`websockets connected ${client.id}`);
  }
}
