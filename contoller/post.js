
// const pg = require('pg');
// const config = require('../config.json');
// // const pool = new pg.Pool(config.db.postgres);
// const sql = "INSERT INTO history (user_input,bot_responce,response_timestamp) VALUES ($1,$2,$3)"

// exports.insert= function(param) {
//   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
//     client.query(sql,param,function(err, result) {
//       done();
//       if(err) return console.error(err);
//       console.log(result.rows);
//     });
//   });
// }
const { Client } = require('pg');
const sql = "INSERT INTO history (user_input,bot_responce,response_timestamp) VALUES ($1,$2,$3)";
exports.insert=function(param){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  console.log(process.env.DATABASE_URL);
  client.connect();
  client.query(sql,param, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  });
}
