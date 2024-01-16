import { Test, TestingModule } from '@nestjs/testing';
import { MailerService } from './mailer.service';
import { FileLogger } from './utils/fileLogger/fileLogger';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((mailOptions) => {
      if (mailOptions.to === 'invalid-recipient@example.com') {
        return Promise.reject(new Error('Failed to send email'));
      }
      return Promise.resolve();
    }),
  }),
}));

describe('MailerService', () => {
  let mailerService: MailerService;
  let loggerSpy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerService, FileLogger],
    }).compile();

    mailerService = module.get<MailerService>(MailerService);
    loggerSpy = jest
      .spyOn(mailerService['logger'], 'log')
      .mockImplementation(() => {});
  });

  it('should be defined', () => {
    expect(mailerService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should send an email successfully', async () => {
      const to = 'recipient@example.com';
      const subject = 'Test Subject';
      const text = 'Test Message';

      await expect(
        mailerService.sendMail(to, subject, text)
      ).resolves.toBeUndefined();
    });

    it('should log the sent email', async () => {
      const to = 'recipient@example.com';
      const subject = 'Test Subject';
      const text = 'Test Message';

      const loggerSpy = jest
        .spyOn(mailerService['logger'], 'log')
        .mockImplementation(() => {});

      await mailerService.sendMail(to, subject, text);

      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining(`"to":"${to}"`)
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining(`"subject":"${subject}"`)
      );
      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining(`"text":"${text}"`)
      );
    });

    it('should log an error if sending email fails', async () => {
      const to = 'invalid-recipient@example.com';
      const subject = 'Test Subject';
      const text = 'Test Message';

      const loggerSpy = jest
        .spyOn(mailerService['logger'], 'error')
        .mockImplementation(() => {});

      await mailerService.sendMail(to, subject, text);

      expect(loggerSpy).toHaveBeenCalled();
    });
  });
});
