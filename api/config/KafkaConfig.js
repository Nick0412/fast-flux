const { Kafka } = require('kafkajs')
const config = require('./index')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [config.kafka_broker]
})

const producer = kafka.producer()

module.exports = producer
