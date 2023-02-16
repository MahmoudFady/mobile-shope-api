const http = require("http");
const app = require("./backend/app");
const {PORT} = require('./backend/config/keys')
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
});
