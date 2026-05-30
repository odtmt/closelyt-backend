import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { WhatsappService } from '../whatsapp/whatsapp.service';
import { AiService } from '../ai/ai.service';
import { CrmService } from '../crm/crm.service';

@Controller('webhook')
export class WebhookController {
  private readonly VERIFY_TOKEN = 'closelyt_verify_2026';

  constructor(
    private readonly whatsapp: WhatsappService,
    private readonly ai: AiService,
    private readonly crm: CrmService,
  ) {}

  @Get()
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    if (mode === 'subscribe' && token === this.VERIFY_TOKEN) {
      return res.status(HttpStatus.OK).send(challenge);
    }

    return res.sendStatus(HttpStatus.FORBIDDEN);
  }

  @Post()
  async handleMessage(@Body() body: any, @Res() res: Response) {
    try {
      const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

      if (!message) {
        return res.status(200).json({ status: 'ignored' });
      }

      const phone = message.from;
      const text = message.text?.body || '';

      // 1. CRM save/update
      const lead = this.crm.upsertLead(phone, text);

      // 2. AI reply
      const aiReply = await this.ai.generateReply(text);

      // 3. WhatsApp send
      await this.whatsapp.sendMessage(phone, aiReply);

      // 4. Save conversation
      this.crm.saveConversation(phone, text, aiReply);

      // 5. Automation trigger
      this.crm.triggerAutomation(lead);

      return res.status(200).json({ status: 'replied' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ status: 'error' });
    }
  }
}
