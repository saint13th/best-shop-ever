import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SetMessageDto } from './dto/set-message.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, TMessageType } from './schemas/chat.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: mongoose.Model<Chat>
  ) { }

  async setMessage(
    setMessageDto: SetMessageDto,
    currentUser,
    adminRoom = '',
  ) {
    if (!currentUser.userId) {
      throw new UnauthorizedException('Пользователь не авторизован!')
    }
    const room = adminRoom ? adminRoom : currentUser.username;
    const foundChat = await this.chatModel.findOne({ room });
    const isManager = currentUser.roles.includes('manager') || currentUser.roles.includes('admin')
    const type: TMessageType = isManager ? 'manager' : 'user';
    const message = {
      type,
      message: setMessageDto.message,
    }

    if (!foundChat) {
      await this.chatModel.create({
        room,
        messages: [message]
      });
    } else {
      foundChat.messages.push(message);

      foundChat.save();
    }

    return { message };
  }

  async findChatMessages(room: string) {
    const chat = await this.chatModel.findOne({ room });

    if (!chat) return { messages: [] };

    return {
      messages: chat.messages,
    };
  }

  async findAllChats() {
    const chats = await this.chatModel.find({}, { room: true });

    if (!chats.length) return { chats: [] };

    return chats;
  }

  findOne(id: number) {
    return `This action returns a #${id} chat`;
  }

  update(id: number, updateChatDto: UpdateChatDto) {
    return `This action updates a #${id} chat`;
  }

  remove(id: number) {
    return `This action removes a #${id} chat`;
  }
}
