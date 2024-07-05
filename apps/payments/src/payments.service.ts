import { Inject, Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';
import { NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectStripe() private readonly stripe: Stripe,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({
    amount,
    email,
    // card,
  }: PaymentsCreateChargeDto) {
    try {
      // const paymentMethod = await this.stripe.paymentMethods.create({
      //   type: 'card',
      //   card,
      // });

      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amount * 100,
        confirm: true,
        payment_method: 'pm_card_visa',
        currency: 'usd',
        return_url: 'https://learnish.vercel.app/',
      });

      this.notificationsService.emit('notify_email', {
        email,
        text: 'Payment was successful!',
      });

      return paymentIntent;
    } catch (err) {
      console.log(err);
    }
  }
}
