import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Historic } from './interfaces/Historic';
import { ReturnMessage } from './interfaces/ReturnMessage';
import { EnigmaService } from './services/enigma.service';
import { checkForDuplicates } from './utils/checkForDuplicates';

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
  listNotificationPhones(): string[] {
    return this.enigmaService.listNotificationPhones();
  }

  @Post('/notification')
  saveNotificationPhones(
    @Body() phones: string[]
  ): ReturnMessage {
    if (!phones.length) {
      return {
        message: 'No phones provided',
      }
    }

    const hasDuplicates = checkForDuplicates(phones);

    if (hasDuplicates) {
      return {
        message: 'Duplicated phones not allowed',
      }
    }

    return this.enigmaService.saveNotificationPhones(phones);
  }

  @Delete('/notification/:phone')
  deleteNotificationPhone(
    @Param('phone') phone: string,
  ): string[] | ReturnMessage {
    return this.enigmaService.deleteNotificationPhone(phone);
  }
}
