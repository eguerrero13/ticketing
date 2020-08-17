import { Publisher, Subjects, TicketUpdatedEvent } from '@egtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TickedUpdated;
}
