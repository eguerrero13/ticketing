import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import mongoose from "mongoose";

const createTicket = async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Concert',
    price: 20,
  });
  await ticket.save();

  return ticket;
};

it('returns an error if a user tries to fetch another user orders', async () => {
  const ticketOne = await createTicket();
  const ticketTwo = await createTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  const {body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const {body: fetchedOrder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', userTwo)
    .send()
    .expect(401);
});

it('returns the order if it is found', async () => {
  const ticketOne = await createTicket();
  const ticketTwo = await createTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  const {body: order} = await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const {body: fetchedOrder} = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', userOne)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});
