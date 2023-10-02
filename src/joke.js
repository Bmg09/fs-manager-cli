const axios = require("axios");
const fetchJoke = function(name, search) {
    const greeting = `Hello, ${name}!`;
    console.log(greeting);
  
    if (search) {
      console.log(`Searching for jokes about ${search}...`);
    } else {
      console.log("Here's a random joke for you:");
    }
  
    const url = search ? `https://icanhazdadjoke.com/search?term=${escape(search)}` : "https://icanhazdadjoke.com/";
  
    axios.get(url, { headers: { Accept: "application/json" } })
      .then(res => {
        if (search) {
          res.data.results.forEach(j => {
            console.log("\n" + j.joke);
          });
          if (res.data.results.length === 0) {
            console.log("no jokes found :'(");
          }
        } else {
          console.log(res.data.joke);
        }
      });
}

module.exports = {
    fetchJoke
}