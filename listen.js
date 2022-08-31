const app = require('./index')
const http = require('http').Server(app);
const port = process.env.PORT || 4000;
http.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
  });