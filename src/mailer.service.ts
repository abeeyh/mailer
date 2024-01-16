import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerService {
  async sendMail(to: string, subject: string, text: string): Promise<void> {
    // Aqui você implementaria o código para enviar o e-mail.
    // Por exemplo, usando nodemailer.
  }
}
