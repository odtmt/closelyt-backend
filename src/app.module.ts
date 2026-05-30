import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WebhookModule } from './webhook/webhook.module';
import { CrmModule } from './crm/crm.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { AutomationModule } from './automation/automation.module';
import { BillingModule } from './billing/billing.module';
import { CommonModule } from './common/common.module';

console.log('🚀 Closelyt backend initializing...');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        if (!uri) {
          console.error('❌ MONGO_URI missing in environment variables');
          throw new Error('MONGO_URI is not defined');
        }

        return {
          uri,
          retryAttempts: 5,
          retryDelay: 3000,
          autoIndex: true,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          connectionFactory: (connection) => {
            console.log('🟢 MongoDB connected successfully');
            return connection;
          },
        };
      },
    }),

    AuthModule,
    UsersModule,
    AiModule,
    WhatsappModule,
    WebhookModule,
    CrmModule,
    WorkspaceModule,
    AutomationModule,
    BillingModule,
    CommonModule,
  ],
})
export class AppModule {}
