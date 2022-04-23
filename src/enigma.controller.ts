import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Historic } from './interfaces/Historic';
import { ReturnMessage } from './interfaces/ReturnMessage';
import { EnigmaService } from './services/enigma.service';

@Controller()
export class EnigmaController {
  constructor(private readonly enigmaService: EnigmaService) { }

  @Get('/historic')
  getKeysHistoric(): Historic[] {
    return this.enigmaService.getKeysHistoric();
  }

  @Post('/send-decrypt')
  sendDecryptKey(
    @Body() decryptedKey: { key: string }
  ): string {
    return this.enigmaService.sendDecryptKey(decryptedKey.key);
  }

  @Get('/notification')
  listNotificationEmails(): string[] {
    return this.enigmaService.listNotificationEmails();
  }

  @Post('/notification')
  saveNotificationEmails(
    @Body() emails: string[]
  ): ReturnMessage {
    if (!emails.length) {
      return {
        message: 'No emails provided',
      }
    }
    return this.enigmaService.saveNotificationEmails(emails);
  }

  @Delete('/notification/:email')
  deleteNotificationEmail(
    @Param('email') email: string,
  ): string[] | ReturnMessage {
    return this.enigmaService.deleteNotificationEmail(email);
  }
}
