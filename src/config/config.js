require('dotenv').config();

const config = {
    port:    process.env.PORT || 3000,
    uri_db:  process.env.URI_DB,
}

module.exports = config;