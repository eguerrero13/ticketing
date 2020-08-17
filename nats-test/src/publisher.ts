import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222',
});

stan.on('connect', async () => {
  console.log('Publisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      price: 20,
      title: 'concert'
    });
  } catch (err) {
    console.error(err);
  }


  stan.on('close', () => {
    console.log('NATS connection closed');
    process.exit();
  });

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'Concert',
  //   price: 20,
  // });
  //
  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published');
  // })
});

process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());
