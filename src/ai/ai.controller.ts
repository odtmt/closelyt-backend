import { Controller, Get } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('test')
  test() {
    return this.aiService.generateReply('Hello Closelyt AI is working 🚀');
  }
}
