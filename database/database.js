const Sequelize = require("sequelize");

const connection = new Sequelize("guiapress", "root", "123456", {
    host:"localhost",
    dialect: "mysql",
    timezone: "-04:00"
});

module.exports = connection;
