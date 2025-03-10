import { Controller, Post, Body, Headers, BadRequestException, Get, UseGuards, Req } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { AtGuard } from 'src/shared/guard';
import { Request } from 'express';
UseGuards(AtGuard)
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService,
    private readonly configService: ConfigService
  ) {}

  @Post('create-customer')
  async createCustomer(@Req() req:Request) {
    const {sub,email} = req.user;
    return this.stripeService.createCustomer(sub, email);
  }

  @Post('create-subscription')
  async createSubscription(@Body() body: { customerId: string; priceId: string }) {
    return this.stripeService.createSubscription(body.customerId, body.priceId);
  }

  @Post('cancel-subscription')
  async cancelSubscription(@Body() body: { subscriptionId: string }) {
    return this.stripeService.cancelSubscription(body.subscriptionId);
  }

  @Post('webhook')
  async handleWebhook(@Body() body: any, @Headers('stripe-signature') sig: string) {
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');

    let event: Stripe.Event;
    try {
      event = this.stripeService.constructWebhookEvent(body, sig, endpointSecret);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'invoice.payment_succeeded':
        console.log('✅ Subscription renewed:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        console.log('⚠️ Subscription canceled:', event.data.object);
        break;
    }

    return { received: true };
  }
}
