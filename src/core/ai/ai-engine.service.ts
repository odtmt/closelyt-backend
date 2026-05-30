import { Injectable } from '@nestjs/common';

@Injectable()
export class AiEngineService {
  async generateReply(lead: any, message: any) {
    return `Thanks for your message: ${message.text}`;
  }
}
