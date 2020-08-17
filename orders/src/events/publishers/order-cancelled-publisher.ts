import { Publisher, Subjects, OrderCancelledEvent } from '@egtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
