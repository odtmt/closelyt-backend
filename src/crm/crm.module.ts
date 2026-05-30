import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CrmService } from './crm.service';
import { Lead, LeadSchema } from './schemas/crm.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lead.name, schema: LeadSchema }]),
  ],
  providers: [CrmService],
  exports: [CrmService],
})
export class CrmModule {}
