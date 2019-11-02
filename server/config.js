const dotenv = require('dotenv').config;
//dotenv.config();
module.exports = {
    mangourl: process.env.MANGOURL,
    port: process.env.PORT
};