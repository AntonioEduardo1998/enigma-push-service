import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/historic')
  getKeysHistoric(): string {
    return this.appService.getKeysHistoric();
  }

  @Post('/send-decrypt')
  sendDecryptKey(): string {
    return this.appService.sendDecryptKey();
  }

  @Delete('/notification/:email')
  deleteNotificationEmail(
    @Param('email') email: string,
  ): string {
    return this.appService.deleteNotificationEmail();
  }
}
