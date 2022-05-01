import { Injectable } from '@nestjs/common';
import { Historic } from 'src/interfaces/Historic';
import { ReturnMessage } from 'src/interfaces/ReturnMessage';
import { EnigmaRepository } from 'src/repositories/enigma.repository';

@Injectable()
export class EnigmaService {

  constructor(private enigmaRepository: EnigmaRepository) { }

  public getKeysHistoric(): Historic[] {
    return this.enigmaRepository.getKeysHistoric();
  }

  public sendDecryptKey(key: string): string {
    const phones = this.enigmaRepository.listNotificationPhones();
    phones.forEach(phone => {
      console.log(`Sending decrypt key (${key}) to ${phone}...`);
      this.enigmaRepository.saveHistoric({
        key,
        phone,
        date: new Date(),
      })
    });
    return 'Keys sent!';
  }

  public listNotificationPhones(): string[] {
    return this.enigmaRepository.listNotificationPhones();
  }

  public saveNotificationPhones(phones: string[]): ReturnMessage {
    return this.enigmaRepository.saveNotificationPhones(phones);
  }

  public deleteNotificationPhone(phone: string): string[] | ReturnMessage {
    return this.enigmaRepository.deleteNotificationPhone(phone);
  }
}
