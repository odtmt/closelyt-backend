import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WebhookModule } from './webhook/webhook.module';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    // ✅ LOAD ENV VARIABLES
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ MONGODB CONNECTION
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/closelyt',
    ),

    // ✅ FEATURE MODULES
    AiModule,
    AuthModule,
    UsersModule,
    WhatsappModule,
    WebhookModule,
    CrmModule,
  ],
})
export class AppModule {}
