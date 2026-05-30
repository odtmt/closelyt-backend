import dotenv from 'dotenv';

dotenv.config();

const envConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl:
    process.env.DATABASE_URL ||
    'postgresql://user:password@localhost:5432/closelyt',
  whatsappToken: process.env.WHATSAPP_TOKEN || '',
  phoneNumberId: process.env.PHONE_NUMBER_ID || '',
  wabaId: process.env.WABA_ID || '',
  whatsappVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || '',
  openaiApiKey: process.env.OPENAI_API_KEY || '',
  jwtSecret: process.env.JWT_SECRET || 'super_secret_jwt_key_change_this',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3001',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:3000',
};

export default envConfig;
