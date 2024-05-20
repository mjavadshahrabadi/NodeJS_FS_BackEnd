const http = require("http");
const app = require("./app/app");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

http
  .createServer(app)
  .listen(PORT, () => console.log(`Server is runing on port: %d`, PORT));
