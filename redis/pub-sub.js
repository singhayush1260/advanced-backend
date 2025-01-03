import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => {
  console.error("Redis client error");
  console.error(error);
});

const testPubSub = async () => {
    try {
      await client.connect();
      console.log("Connected to Redis Server on PORT 6379.");
      const subscriber=client.duplicate();
      await subscriber.connect();
      await subscriber.subscribe("dummy",(message,channel)=>{
        console.log(`Message received from ${channel}: ${message}`);
      });
      await client.publish("dummy","Some dummy message");
       fetchFromDatabase();
       await subscriber.unsubscribe("dummy");
       await subscriber.quit();
    } catch (error) {
      console.error("Error in testPubSub");
      console.error(error);
    } finally {
      const name=await client.get("name");
      await client.quit();
      console.log("Connection closed.",name);
    }
  };


  testPubSub();

  // Simulate a slow database fetch
const fetchFromDatabase = (key) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = `Data for key: ${key}`;
        resolve(data);
      }, 3000); // Simulating a 3-second delay
    });
  };