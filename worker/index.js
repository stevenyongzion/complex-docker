const keys = require('./keys')
const redis = require('redis')

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    // attempt to reconnect if loose connection to server, ms
    retry_strategy: () => 1000
})

const sub = redisClient.duplicate()

const fib = (index) => {
    if (index < 2) return 1

    return fib(index - 1) + fib(index - 2)
}

sub.on('message', (channel, message) => {
    redisClient.hset('values', message, fib(parseInt(message)))
})

// anytime when someone inserts a new value into redis
// we are going to get that value and we will calculate the fib up there
// for that value and toss it back to the redis instance
sub.subscribe('insert')


