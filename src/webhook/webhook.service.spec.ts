import { Injectable } from '@nestjs/common';

@Injectable()
export class WebhookService {
  process(data: any) {
    return data;
  }
}
