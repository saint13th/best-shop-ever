import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ChatDocument = HydratedDocument<Chat>;
export type TMessageType = 'user' | 'manager';

@Schema()
export class Chat {
    @Prop()
    room: string;

    @Prop()
    messages: {
        type: TMessageType;
        message: string;
    }[]
}

export const ChatSchema = SchemaFactory.createForClass(Chat)