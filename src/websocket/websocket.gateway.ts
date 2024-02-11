import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';
import { Logger, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from '../chat/chat.service';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
})
export class WebsocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('ChatGateway');

  constructor(
    private readonly websocketService: WebsocketService,
    private readonly chatService: ChatService,
  ) { }


  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleDisconnect(client: Socket) {
    console.log(`websockets disconnected: ${client.id}`);
  }

  @UseGuards(JwtAuthGuard)
  handleConnection(socket: Socket, @Req() request) {
    this.websocketService.handleConnection(socket);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('chatToServer')
  async handleMessage(client: Socket, data: { message: string, room?: string }) {
    // @ts-ignore
    const currentUser = { ...client.handshake.user };
    let adminRoom = '';

    if (currentUser.roles.includes('manager') || currentUser.roles.includes('admin')) {
      adminRoom = data?.room;
    }
    const result = await this.chatService.setMessage({ message: data.message }, currentUser, adminRoom)

    if (result) {
      const room = adminRoom ? adminRoom : currentUser.username;

      this.server.to(room).emit('chatToClient', result.message);
    }
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinRoom')
  handleRoomJoin(client: Socket, room: string) {
    // @ts-ignore
    const currentUser = { ...client.handshake.user };
    
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  handleRoomLeave(client: Socket, room: string) {
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
