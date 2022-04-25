const express = require("express");
const app = express();
require("./src/db/connection");
const router = require("../Backend/src/routers/routes");
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(router);
app.listen(port, ()  => {
  console.log(`Connected to ${port}`);
});
