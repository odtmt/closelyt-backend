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

  // ✅ META VERIFICATION
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

  // 🚀 MESSAGE RECEIVER + CRM + AI + WHATSAPP REPLY
  @Post()
  async handleMessage(@Body() body: any, @Res() res: Response) {
    try {
      const message = body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

      if (!message) {
        console.log('⚠️ Non-message event:', JSON.stringify(body, null, 2));
        return res.status(200).json({ status: 'ignored' });
      }

      const phone = message.from;
      const text = message.text?.body;

      console.log('\n📩 INCOMING MESSAGE');
      console.log('From:', phone);
      console.log('Text:', text);

      // 1️⃣ SAVE / UPDATE CRM LEAD
      this.crm.upsertLead(phone, text);

      // 2️⃣ GENERATE AI RESPONSE
      const reply = await this.ai.generateReply(text);

      console.log('🤖 AI REPLY:', reply);

      // 3️⃣ SEND WHATSAPP MESSAGE
      await this.whatsapp.sendMessage(phone, reply);

      // 4️⃣ SAVE REPLY TO CRM
      this.crm.saveReply(phone, reply);

      return res.status(200).json({ status: 'replied' });
    } catch (error) {
      console.error('❌ Webhook error:', error);
      return res.status(500).json({ status: 'error' });
    }
  }
}
