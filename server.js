const http = require("http");
const app = require("./app/app");
const { connect } = require("./db/db");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connect().then(() => {
  server.listen(PORT, () => console.log(`ON PORT: ${PORT}`));
});
