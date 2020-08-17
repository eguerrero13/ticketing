import { Publisher, Subjects, OrderCreatedEvent } from '@egtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
