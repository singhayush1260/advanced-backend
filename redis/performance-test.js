import { createClient } from 'redis';

// Create a Redis client
const redisClient = createClient();

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

// Simulate a slow database fetch
const fetchFromDatabase = (key) => {
  return new Promise((resolve) => {
    console.log('Fetching data from the database...');
    setTimeout(() => {
      const data = `Data for key: ${key}`;
      resolve(data);
    }, 3000); // Simulating a 3-second delay
  });
};

// Measure time taken for a function to execute
const measureTime = async (label, fn) => {
  const start = Date.now();
  const result = await fn();
  const end = Date.now();
  console.log(`${label} took ${end - start} ms`);
  return result;
};

// Main function to demonstrate the difference
const main = async () => {
  const key = 'testKey';

  // Ensure Redis client is ready
  await redisClient.connect();

  console.log('\n=== Without Redis ===');
  await measureTime('Database fetch', async () => {
    return await fetchFromDatabase(key);
  });

  console.log('\n=== With Redis ===');
  const dataWithRedis = await measureTime('Redis fetch', async () => {
    // Check if data exists in Redis
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      console.log('Cache hit!');
      return cachedData;
    }

    console.log('Cache miss!');
    // Fetch data from the database
    const data = await fetchFromDatabase(key);
    // Store data in Redis with a 60-second expiration
    await redisClient.setEx(key, 60, data);
    return data;
  });

  console.log('Fetched Data:', dataWithRedis);

  // Clean up
  await redisClient.disconnect();
};

main().catch((error) => {
  console.error('Error:', error);
});
