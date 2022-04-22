import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getKeysHistoric(): string {
    return 'Hello World!';
  }

  sendDecryptKey(): string {
    return 'Hello World!';
  }

  deleteNotificationEmail(): string {
    return 'Hello World!';
  }
}
