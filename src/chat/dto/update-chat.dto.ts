import { PartialType } from '@nestjs/swagger';
import { SetMessageDto } from './set-message.dto';

export class UpdateChatDto extends PartialType(SetMessageDto) {}
