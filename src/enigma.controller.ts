import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Historic } from './Entities/Historic';
import { Phone } from './Entities/Phone';
import { ReturnMessage } from './interfaces/ReturnMessage';
import { EnigmaService } from './services/enigma.service';
import { checkForDuplicates } from './utils/checkForDuplicates';

@Controller()
export class EnigmaController {
  constructor(private readonly enigmaService: EnigmaService) {}

  @Get('/historic')
  getKeysHistoric(): Promise<Historic[]> {
    return this.enigmaService.getKeysHistoric();
  }

  @Post('/send-decrypt')
  sendDecryptKey(@Body() decryptedKey: { key: string }): Promise<string> {
    return this.enigmaService.sendDecryptKey(decryptedKey.key);
  }

  @Get('/notification')
  listNotificationPhones(): Promise<Phone[]> {
    return this.enigmaService.listNotificationPhones();
  }

  @Post('/notification')
  saveNotificationPhones(@Body() phones: string[]): Promise<ReturnMessage> {
    if (!phones.length) {
      return Promise.resolve({
        message: 'No phones provided',
      });
    }

    const hasDuplicates = checkForDuplicates(phones);

    if (hasDuplicates) {
      return Promise.resolve({
        message: 'Duplicated phones not allowed',
      });
    }

    const newPhones = phones.map((phone) => new Phone(phone));

    return this.enigmaService.saveNotificationPhones(newPhones);
  }

  @Delete('/notification/:phone')
  deleteNotificationPhone(
    @Param('phone') phone: string,
  ): Promise<ReturnMessage> {
    return this.enigmaService.deleteNotificationPhone(phone);
  }
}
