require("dotenv").config();

module.exports = {
  httpUrl: process.env.HTTP_URL || "https://apollochatroom.herokuapp.com/graphql",
  webSocketUrl: process.env.WEB_SOCKET_URL || "wss://apollochatroom.herokuapp.com/graphql",
};
