import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

import { WhatsappModule } from '../whatsapp/whatsapp.module';
import { AiModule } from '../ai/ai.module';
import { CrmModule } from '../crm/crm.module';

@Module({
  imports: [WhatsappModule, AiModule, CrmModule],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
