import { Injectable } from '@nestjs/common';

@Injectable()
export class AiService {
  async generateReply(message: string) {
    // MVP AI logic (replace with OpenAI later)
    return `🤖 Auto-reply: I received your message -> "${message}"`;
  }
}
