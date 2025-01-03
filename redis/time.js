const fetchFromDatabase = (key) => {
    return new Promise((resolve) => {
      console.log('Fetching data from the database...');
      setTimeout(() => {
        const data = `Data for key: ${key}`;
        resolve(data);
      }, 3000); // Simulating a 3-second delay
    });
  };


console.time("Time taken for API call");


fetchFromDatabase();

console.timeEnd("Time taken for API call")









