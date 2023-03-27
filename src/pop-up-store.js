console.log("Now entering pop-up-store.js")

/**
 * A robust, performance-focused and full-featured Redis client for Node.js.
 *
 * @see https://github.com/luin/ioredis
 */
const Redis = require("ioredis");

/**
 * You can also specify connection options as a redis:// URL or rediss:// URL when using TLS encryption:
 */
const URI = getRedisURI();
const redis = new Redis(URI);

// const redis = new Redis(getRedisURI());
// const redis = new Redis("localhost:6379");

// const redis = new Redis(getRedisURI());


console.log(`XXXXXXZZZZZZZZ BEGIN redis.ping`);


redis.ping((err, result) => {
  if (err) {
    console.log(`XXXXXXYYYYYYY Redis connection error. Response: ${err}`);
    console.error(err);
  } else {
    console.log(`XXXXXX Redis connection successful. Response: ${result}`);
  }
});

console.log(`XXXXXXZZZZZZZZ END redis.ping`);

const redisClient = new Redis({
  host: 'localhost',
  port: 6379
});

console.log(`XXXXXXZZZZZZZZ BEGIN redisClient.ping`);


redisClient.ping((err, result) => {
  if (err) {
    console.log(`XXXXXXYYYYYYY Redis connection error. Response: ${err}`);
    console.error(err);
  } else {
    console.log(`XXXXXX Redis connection successful. Response: ${result}`);
  }
});

console.log(`XXXXXXZZZZZZZZ END redisClient.ping`);


/**
 * There are 10000 products on sale today
 *
 * @see https://redis.io/commands/set
 */
const product = 10000;
redisClient.set("product", product);

/**
 * Get Redis host from first argument (optional)
 * argv is: [ '/usr/local/bin/node', '/app/src/pop-up-store.js', '...' ]
 */
function getRedisURI() {
  if (process.argv.length > 2) {
    console.log("1getRedisURI() " + "redis://"+process.argv[2]+":6379");
    console.log("1getRedisURI() process.argv[0] = " + process.argv[0]);
    console.log("1getRedisURI() process.argv[1] = " + process.argv[1]);
    console.log("1getRedisURI() process.argv[2] = " + process.argv[2]);
    // console.log("1getRedisURI() process.argv[3] = " + process.argv[3]);
    // return "redis://localhost:6379";
    return "redis://"+process.argv[2]+":6379";
  } else {
    console.log("2getRedisURI() redis://localhost:6379");
    
    return "http://[::1]:6379";
    // return "redis://localhost:6379";
  }
}

/**
 * Generate Id
 */
function genId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Every customer wants to buy 1 product
 */
function submitOrder(err, result) {
  if (err) {
    console.error(err);
    return;
  }

  /**
   * Waiting for customer to submit order
   *
   * @see https://redis.io/commands/xadd
   */
  setTimeout(function () {
    redisClient.xadd("orders", "*", "id", genId(), "customer", result);
  }, Math.floor(Math.random() * 1000));
}

/**
 * New customer
 */
function newCustomer() {
  /**
   * Registering new customer
   */
  redisClient.xadd("queue:customers", "*", "id", genId(), submitOrder);

  /**
   * Waiting for the next
   */
  setTimeout(newCustomer, Math.floor(Math.random() * 1000));
}

/**
 * Sale started
 */
console.log("Now running simulation...")
newCustomer();
