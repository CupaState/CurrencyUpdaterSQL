//В этом файле обновляем базу данных из 1.json
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
        console.log("ERRRRROOOOOOOOOORRR!");
        return err;
    }
  });

    for(let i = 1; i < codes.length + 1; i++)
    {
      let msql = "UPDATE currencies SET code ='"+codes[i-1]+"' , symbol ='"+symbols[i-1]+"' , name ='"+names[i-1]+"' WHERE id="+i+"";

      let query = connection.query(msql,
        (err, result) => 
        {
          if(err)
          {
            console.log(err);
          }
          console.log("Record Updated!!");
          console.log(result);
        }
      );
    }

  connection.end();

