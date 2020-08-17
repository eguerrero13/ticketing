import { Publisher, PaymentCreatedEvent, Subjects } from '@egtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
