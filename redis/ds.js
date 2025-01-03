import redis from "redis";

const client = redis.createClient({
  host: "localhost",
  port: 6379,
});

client.on("error", (error) => {
  console.error("Redis client error");
  console.error(error);
});

const redisDataStructures = async () => {
    try {
      await client.connect();
      console.log("Connected to Redis Server on PORT 6379.");
      // strings
      //await client.mSet(["firstName","Ayush","lastName","Singh"]);
      //const [fname,lname]=await client.mGet(["firstName","lastName"])
      //console.log(fname+" "+lname);

      // lists

      await client.lPush("notes",["1","2","3","4","5"]);
      



    } catch (error) {
      console.error("Error in redisDataStructures");
      console.error(error);
    } finally {
      await client.quit();
      console.log("Connection closed.");
    }
  };
  redisDataStructures();