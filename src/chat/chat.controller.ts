import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SetMessageDto } from './dto/set-message.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('chats')
@Controller('api/v1/chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  setMessage(@Body() setMessageDto: SetMessageDto, @Req() request) {
    const currentUser = { ...request.user };

    return this.chatService.setMessage(setMessageDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findChatMessages(@Req() request) {
    const email = request.user.username;

    return this.chatService.findChatMessages(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatService.update(+id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
