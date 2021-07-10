const EventEmitter = require('events')
const kafka = require('../config/KafkaConfig')

const UserEvents = {
  USER_CREATED: 'user-created',
  USER_MODIFIED: 'user-modified',
  USER_DELETD: 'user-deleted'
}
const UserEmitter = new EventEmitter()

UserEmitter.on(UserEvents.USER_CREATED, async (userData) => {
  await kafka.connect()
  await kafka.send({
    topic: 'test-topic',
    messages: [
      { value: JSON.stringify(userData) }
    ]
  })
})

module.exports = { UserEmitter, UserEvents }
