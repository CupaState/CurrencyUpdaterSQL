const sql = require('mysql');

const connection = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "root",
      database: "currency_dataset"
    }
  );
  
  connection.connect((err) =>
{
    if(err)
    {
      console.log(err);
      return err;
    }
    else
    {
      console.log("===========================DATABASE IS OPEN!===============================");
    }
});

let query = "SELECT * from currencies";

connection.query(query, (err, result, field) =>
{
  console.log(err);
  console.log(result);
});

connection.end((err)=>
{
  if(err)
  {
    console.log(err);
  }
  else
  {
    console.log("=======================DATABASE is CLOSE!=======================")
  }
});