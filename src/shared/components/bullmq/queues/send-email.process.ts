import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { QUEUENAME } from 'src/shared/components/bullmq/constants';
import { NodemailerService } from 'src/shared/components/nodemailer/nodemailer.service';

@Processor(QUEUENAME.sendEmail)
export class sendEmailProcessor extends WorkerHost {
  constructor(private nodeMailerSerivce: NodemailerService) {
    super();
  }
  private logger = new Logger('sendEmailProcessor');
  async process(job: Job<any, any, string>, token?: string): Promise<any> {
    this.logger.log(`Processing send OTP to ....`);
    const send_OTP = await this.sendOTPToEmail(job.name, job.data);
    return send_OTP;
  }
  async sendOTPToEmail(email: string, otp: string) {
    this.logger.log(`Processing send OTP to ${email}....`);
    return await this.nodeMailerSerivce.sendOTP(email, otp);
  }
}
