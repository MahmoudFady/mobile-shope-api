require("dotenv").config();

const http = require("http");
const app = require("./backend/app");
const PORT = process.env.PORT || 3200;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("server is running on port : " + PORT);
  console.log("server working ....");
});
