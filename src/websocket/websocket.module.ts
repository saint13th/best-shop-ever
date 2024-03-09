import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { ChatModule } from '../chat/chat.module';

@Module({
    imports: [ChatModule],
    providers: [WebsocketGateway, WebsocketService],
})

export class WebsocketModule { }