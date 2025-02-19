import { Controller, Post, Body } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { Public } from 'src/shared/decorators/public.decrators';

@Controller('mail')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('send-otp')
  @Public()
  async sendOTP(@Body('email') email: string) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    await this.nodemailerService.sendOTP(email, otp);
    return { message: 'OTP sent successfully' };
  }
}
