const http = require('http');
const port = process.env.PORT || '3000';
const INTERVAL = 1000;
const END = 20000;
let clientID = 0;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    const client = ++clientID;

    console.log(`Client: ${client} connected!`);

    const intervalID = setInterval(() => {
      console.log(`Client: ${client}, time: ${new Date().toUTCString()}`);
    }, INTERVAL);

    setTimeout(() => {
      clearInterval(intervalID);
      const time = new Date().toUTCString();
      console.log(`Client: ${client}, time: ${time} end connection`);
      res.end(`Current time: ${time}`);
    }, END);
  }
});

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
