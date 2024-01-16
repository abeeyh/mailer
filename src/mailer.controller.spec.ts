import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './sendmail.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('MailerController', () => {
  let mailerController: MailerController;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailerController],
      providers: [
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn(),
          },
        },
      ],
    }).compile();

    mailerController = module.get<MailerController>(MailerController);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(mailerController).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call sendMail method from MailerService with the correct parameters', async () => {
      const sendEmailDto: SendEmailDto = {
        to: 'test@example.com',
        subject: 'Test Subject',
        text: 'Test Message',
      };

      await mailerController.sendEmail(sendEmailDto);

      expect(mailerService.sendMail).toHaveBeenCalledWith(
        sendEmailDto.to,
        sendEmailDto.subject,
        sendEmailDto.text
      );
    });
  });
});
