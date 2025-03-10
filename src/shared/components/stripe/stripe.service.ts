import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/modules/user/user.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService,
    
    private prisma: PrismaService
  ) {
    this.stripe = new Stripe(this.configService.get<string>('STRIPE_SECRET_KEY'),{
        apiVersion: "2025-02-24.acacia"
    }
    );
  }

  async createCustomer(  userId: string, email: string ) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new NotFoundException("User not found");
  
    if (user.stripeCustomerId) return { customerId: user.stripeCustomerId };
    const customer = await this.stripe.customers.create({ email });
    // update User
    await this.prisma.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
      });
    
    return { stripeCustomerId: customer.id };
  }

  async createSubscription(userId: string, priceId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
  
    if (!user) throw new NotFoundException("User not found");
  
    let subscription = await this.prisma.subscription.findUnique({
      where: { userId },
    });
  
    if (subscription) throw new ForbiddenException("User already has a subscription");
  
    const stripeCustomer = await this.stripe.customers.create({
      email: user.email,
      metadata: { userId },
    });
  
    const stripeSubscription = await this.stripe.subscriptions.create({
      customer: stripeCustomer.id,
      items: [{ price: priceId }],
      expand: ["latest_invoice.payment_intent"],
    });
  
    subscription = await this.prisma.subscription.create({
      data: {
        userId,
        stripeCustomerId: stripeCustomer.id,
        stripeSubscriptionId: stripeSubscription.id,
        priceId,
        status: "ACTIVE",
      },
    });
  
    return subscription;
  }
  

  async cancelSubscription(subscriptionId: string) {
    return await this.stripe.subscriptions.cancel(subscriptionId);
  }

  constructWebhookEvent(body: Buffer, sig: string, secret: string) {
    return this.stripe.webhooks.constructEvent(body, sig, secret);
  }
}
