import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AiModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { WebhookModule } from './webhook/webhook.module';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    // 🌍 GLOBAL CONFIG (ENV SAFE + VALIDATION READY)
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),

    // 🧠 ASYNC MONGODB CONNECTION (PRODUCTION SAFE)
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('MONGO_URI');

        if (!uri) {
          throw new Error('❌ MONGO_URI is not defined');
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

    // 🚀 CORE MODULES (CLEAN ARCHITECTURE)
    AuthModule,
    UsersModule,
    AiModule,
    WhatsappModule,
    WebhookModule,
    CrmModule,
  ],
})
export class AppModule {}
