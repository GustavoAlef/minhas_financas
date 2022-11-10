const pgp = require("pg-promise");

class Connection {
   constructor() {
    this.connection = pgp()("postgres://postgres:docker@localhost:5432/postgres")
   }

   query(statement, params) {
    return this.connection.query(statement, params);
   }
}

module.exports = Connection;