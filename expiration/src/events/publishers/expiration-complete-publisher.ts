import { Publisher, Subjects, ExpirationCompleteEvent } from '@egtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
