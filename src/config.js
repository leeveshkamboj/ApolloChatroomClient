require("dotenv").config();

module.exports = {
  httpUrl: process.env.HTTP_URL || "http://localhost:4000/graphql",
  webSocketUrl: process.env.WEB_SOCKET_URL || "ws://localhost:4000/graphql",
};
