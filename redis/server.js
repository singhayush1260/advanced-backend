import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => {
  console.error("Redis client error");
  console.error(error);
});

const testRedisConnection = async () => {
  try {
    await client.connect();
    console.log("Connected to Redis Server on PORT 6379.");
    await client.set("name","ayush");
  } catch (error) {
    console.error("Error in testRedisConnection");
    console.error(error);
  } finally {
    const name=await client.get("name");
    await client.quit();
    console.log("Connection closed.",name);
  }
};
testRedisConnection();
