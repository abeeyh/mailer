import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './sendmail.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto): Promise<void> {
    const { to, subject, text } = sendEmailDto;
    await this.mailerService.sendMail(to, subject, text);
  }
}
