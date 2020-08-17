"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
console.clear();
var stan = node_nats_streaming_1.default.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});
stan.on('connect', function () {
    console.log('Publisher connected to NATS');
    stan.on('close', function () {
        console.log('NATS connection closed');
        process.exit();
    });
    var data = JSON.stringify({
        id: '123',
        title: 'Concert',
        price: 20
    });
    stan.publish('ticket:created', data, function () {
        console.log('Event published');
    });
});
process.on('SIGINT', function () { return stan.close(); });
process.on('SIGTERM', function () { return stan.close(); });
