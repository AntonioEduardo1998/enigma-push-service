import { Injectable } from "@nestjs/common";
import { Historic } from "src/interfaces/Historic";
import { ReturnMessage } from "src/interfaces/ReturnMessage";

@Injectable()
export class EnigmaRepository {
    private emails: string[] = [];
    private historic: Historic[] = [];

    public saveNotificationEmails(emails: string[]): ReturnMessage {
        this.emails = emails;
        return {
            message: "Emails saved",
        }
    }

    public listNotificationEmails(): string[] {
        return this.emails;
    }

    public deleteNotificationEmail(email: string): string[] | ReturnMessage {
        const emailFounded = this.emails.findIndex(e => e === email);
        if (emailFounded !== -1) {
            this.emails.splice(emailFounded, 1);
            return this.emails;
        }
        return {
            message: "Email not found",
        }
    }

    public saveHistoric(historic: Historic): void {
        this.historic.push(historic);
    }

    public getKeysHistoric(): Historic[] {
        return this.historic;
    }
}