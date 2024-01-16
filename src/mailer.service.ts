import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { FileLogger } from './utils/fileLogger/fileLogger';

@Injectable()
export class MailerService {
  private readonly logger: FileLogger;
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.logger = new FileLogger(MailerService.name);
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'your-email@example.com',
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);

      this.logger.log(
        `E-mail sent successfully! ${JSON.stringify(mailOptions)}`
      );
    } catch (error) {
      this.logger.error(`Error sending e-mail: ${error.message}`, error.stack);
    }
  }
}
