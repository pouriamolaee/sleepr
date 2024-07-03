import { Injectable } from '@nestjs/common';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';
import { InjectStripe } from 'nestjs-stripe';
import { Stripe } from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(@InjectStripe() private readonly stripe: Stripe) {}

  async createCharge({
    amount,
    // card,
  }: CreateChargeDto) {
    try {
      // const paymentMethod = await this.stripe.paymentMethods.create({
      //   type: 'card',
      //   card,
      // });

      return await this.stripe.paymentIntents.create({
        amount: amount * 100,
        confirm: true,
        payment_method: 'pm_card_visa',
        currency: 'usd',
        return_url: 'https://learnish.vercel.app/',
      });
    } catch (err) {
      console.log(err);
    }
  }
}
