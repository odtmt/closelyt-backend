import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 🚨 Validate critical environment variables first
  if (!process.env.MONGO_URI) {
    throw new Error('❌ MONGO_URI is missing in environment variables');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('❌ JWT_SECRET is missing in environment variables');
  }

  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend / WhatsApp / web access
  app.enableCors();

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`🚀 Closelyt backend running on port ${port}`);
  console.log(`🟢 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
