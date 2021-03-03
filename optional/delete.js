//В этом файле ПОЛНОСТЬЮ ОЧИЩАЕМ таблицу
let sql = require("mysql");

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
});

let msql = "TRUNCATE TABLE currencies";

connection.query(msql, 
    function (err, result) 
    {
        if (err) throw err;
    });

    connection.end();