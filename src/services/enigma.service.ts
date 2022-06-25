import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RSA_TOKEN } from 'src/constants/rsa';
import { Historic } from 'src/Entities/Historic';
import { Phone } from 'src/Entities/Phone';
import { ReturnMessage } from 'src/interfaces/ReturnMessage';
import { Repository } from 'typeorm';

const accountSid = 'AC63fff6ae4c45d080fb9fded8d110d11c';
const authToken = 'c3555e3a612b0841cb1e43e4db1cc073';

@Injectable()
export class EnigmaService {
  constructor(
    @InjectRepository(Phone)
    private phonesRepository: Repository<Phone>,
    @InjectRepository(Historic)
    private historicRepository: Repository<Historic>,
    @Inject('PHONES_SERVICE') private client: ClientProxy,
  ) {}

  public getKeysHistoric(): Promise<Historic[]> {
    return this.historicRepository.find();
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

  public async sendDecryptKey(key: string): Promise<string> {
    const phones = await this.listNotificationPhones();

    try {
      phones.forEach(async (phone) => {
        const descrypted = this.sendSMS(key, phone.number);

        await this.historicRepository.save(
          new Historic(descrypted, phone.number, new Date()),
        );
      });

      return 'Keys sent!';
    } catch (error) {
      return 'Keys not sent!';
    }
  }

  public listNotificationPhones(): Promise<Phone[]> {
    try {
      return this.phonesRepository.find();
    } catch (error) {}
  }

  public async saveNotificationPhones(phones: Phone[]): Promise<ReturnMessage> {
    try {
      await this.phonesRepository.save(phones);
      return {
        message: 'Phones saved!',
      };
    } catch (error) {
      return {
        message: 'Phones not saved!',
      };
    }
  }

  public async deleteNotificationPhone(phone: string): Promise<ReturnMessage> {
    try {
      const p = await this.phonesRepository.findOne({
        where: {
          number: phone,
        },
      });
      await this.phonesRepository.remove(p);
      return {
        message: 'Phone deleted!',
      };
    } catch (error) {
      return {
        message: 'Phone not found!',
      };
    }
  }
}
