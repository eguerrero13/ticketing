import { Publisher, Subjects, TicketCreatedEvent } from '@egtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
