import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomationEngineService {
  async check(lead: any, _message: { phone: any; text: any; timestamp: Date }) {
    return null;
  }
}
