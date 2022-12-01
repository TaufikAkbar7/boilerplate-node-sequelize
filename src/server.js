const express = require("express");
const router = require("./router");
const { PORT } = require("./helpers/env");
const { sequelize } = require("./sequelize/models");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(PORT, async () => {
    console.log(`Server up on http://localhost:${PORT}`);
    await sequelize.sync();
    console.log("database sync");
});
