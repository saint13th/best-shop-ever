import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketService } from './websocket.service';
import { ChatModule } from 'src/chat/chat.module';

@Module({
    imports: [ChatModule],
    providers: [WebsocketGateway, WebsocketService],
})

export class WebsocketModule { }