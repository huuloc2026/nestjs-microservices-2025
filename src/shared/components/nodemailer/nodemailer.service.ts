import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { htmlContent } from 'src/shared/components/nodemailer/templates';

@Injectable()
export class NodemailerService {
  constructor(private readonly mailerService: MailerService) {}
  private logger = new Logger('NodemailerService');
  async sendOTP(email: string, otp: string): Promise<void> {
    const URL_VERIFY = 'https://mail.google.com/mail';
    const template = htmlContent(URL_VERIFY, otp, email);
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Your OTP Code',
        html: template,
      });
      this.logger.log(`Successfully sent OTP to ${email}`);
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    }
  }
}
