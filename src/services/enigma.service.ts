import { Injectable } from '@nestjs/common';
import { RSA_TOKEN } from 'src/constants/rsa';
import { Historic } from 'src/interfaces/Historic';
import { ReturnMessage } from 'src/interfaces/ReturnMessage';
import { EnigmaRepository } from 'src/repositories/enigma.repository';

const accountSid = 'AC63fff6ae4c45d080fb9fded8d110d11c';
const authToken = 'c3555e3a612b0841cb1e43e4db1cc073';

@Injectable()
export class EnigmaService {
  constructor(private enigmaRepository: EnigmaRepository) {}

  public getKeysHistoric(): Historic[] {
    return this.enigmaRepository.getKeysHistoric();
  }

  public sendSMS(key: string, phone: string) {
    const client = require('twilio')(accountSid, authToken);
    const NodeRSA = require('node-rsa');

    const RSA = new NodeRSA(RSA_TOKEN);

    const decrypted = RSA.decrypt(key, 'utf8');

    client.messages
      .create({
        to: phone,
        from: '+19897350226',
        body: 'Novas diretrizes: ' + decrypted,
      })
      .then((message) => console.log(message.sid))
      .done();

    return decrypted;
  }

  public sendDecryptKey(key: string): string {
    const phones = this.enigmaRepository.listNotificationPhones();

    phones.forEach((phone) => {
      const descrypted = this.sendSMS(key, phone);

      this.enigmaRepository.saveHistoric({
        key: descrypted,
        phone,
        date: new Date(),
      });
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
