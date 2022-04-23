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
    const emails = this.enigmaRepository.listNotificationEmails();
    emails.forEach(email => {
      console.log(`Sending decrypt key (${key}) to ${email}...`);
      this.enigmaRepository.saveHistoric({
        key,
        email,
        date: new Date(),
      })
    });
    return 'Keys sent!';
  }

  public listNotificationEmails(): string[] {
    return this.enigmaRepository.listNotificationEmails();
  }

  public saveNotificationEmails(emails: string[]): ReturnMessage {
    return this.enigmaRepository.saveNotificationEmails(emails);
  }

  public deleteNotificationEmail(email: string): string[] | ReturnMessage {
    return this.enigmaRepository.deleteNotificationEmail(email);
  }
}
