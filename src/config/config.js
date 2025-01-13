require('dotenv').config();

const config = {
    port:    process.env.PORT || 3000,
    uri_db:  process.env.URI_DB,
    api_secret: process.env.API_SECRET
}

module.exports = config;