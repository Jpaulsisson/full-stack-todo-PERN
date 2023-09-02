const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'PaulSiss#99',
  host: 'localhost',
  port: 5432,
  database: "Todo_App_PERN",
})

module.exports = {
  pool
}