import { Injectable } from "@nestjs/common";
import { Historic } from "src/interfaces/Historic";
import { ReturnMessage } from "src/interfaces/ReturnMessage";

@Injectable()
export class EnigmaRepository {
    private phones: string[] = [];
    private historic: Historic[] = [];

    public saveNotificationPhones(phones: string[]): ReturnMessage {
        this.phones = phones;
        return {
            message: "Phones saved",
        }
    }

    public listNotificationPhones(): string[] {
        return this.phones;
    }

    public deleteNotificationPhone(phone: string): string[] | ReturnMessage {
        const phoneFounded = this.phones.findIndex(p => p === phone);
        if (phoneFounded !== -1) {
            this.phones.splice(phoneFounded, 1);
            return this.phones;
        }
        return {
            message: "Phone not found",
        }
    }

    public saveHistoric(historic: Historic): void {
        this.historic.push(historic);
    }

    public getKeysHistoric(): Historic[] {
        return this.historic;
    }
}