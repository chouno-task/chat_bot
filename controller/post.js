const { Client } = require('pg');
const INSERT_SQL = 'INSERT INTO post (user_input,bot_response,response_timestamp) VALUES ($1,$2,$3)';
const LIST_SQL = 'SELECT user_input,bot_response,response_timestamp FROM post ORDER BY response_timestamp DESC LIMIT 10';
require('dotenv').config();
exports.insert=function(param){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  client.connect();
  client.query(INSERT_SQL,param,(err,res) => {
    if (err) throw err;
    client.end();
  });
}

exports.list= async function(){
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });
  await client.connect()
  const res = await client.query(LIST_SQL);
  await client.end()
  return JSON.stringify(res.rows,null,"\t");
}
