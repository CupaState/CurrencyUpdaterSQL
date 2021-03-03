//В этом файле - вставляем елементы в таблицу (базу данных)
let sql = require("mysql");
const fs = require("fs");

let obj = fs.readFileSync('1.json', "utf-8");
let temp = JSON.parse(obj);

let arr = temp.data;

let codes = new Array();
let symbols = new Array();
let names = new Array();

codes = arr.map(el => el.code );
symbols = arr.map(el => el.symbol);
names = arr.map(el => el.name);

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

    //Insert a record in the "customers" table:
    for(let i = 0; i < codes.length; ++i)
    {
        let fsql = "INSERT INTO currencies (code, symbol, name) VALUES ('"+codes[i]+"', '"+symbols[i]+"', '"+names[i]+"')";
        connection.query(fsql, 
        function (err, result) 
        {
            if (err) throw err;
        });
    }

  connection.end();