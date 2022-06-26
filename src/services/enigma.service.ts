import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { RSA_TOKEN } from 'src/constants/rsa';
import { Historic } from 'src/Entities/Historic';
import { Phone } from 'src/Entities/Phone';
import { ReturnMessage } from 'src/interfaces/ReturnMessage';
import { Repository } from 'typeorm';

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

  public async sendDecryptKey(key: string): Promise<string> {
    const phones = await this.listNotificationPhones();
    const NodeRSA = require('node-rsa');
    const RSA = new NodeRSA(RSA_TOKEN);

    try {
      const decrypted = RSA.decrypt(key, 'utf8');

      phones.forEach(async (phone) => {
        this.client.emit('send-sms', { key: decrypted, phone: phone.number });
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
