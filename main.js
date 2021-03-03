//ГЛАВНЫЙ ФАЙЛ ПРОГРАММЫ
//здесь мы получаем данные о валютах через API
//и обновляем базу данных
let sql = require("mysql");

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fs = require("fs");

// 1. Создаём новый объект XMLHttpRequest
let xhr = new XMLHttpRequest();

// 2. Конфигурируем его: GET-запрос на URL
xhr.open('GET', 'http://api.marketstack.com/v1/currencies?access_key=0b7ad927083ef11ab1c867a742fa87d6&limit=300', false);

// 3. Отсылаем запрос
xhr.send();

let response;

// 4. Если код ответа сервера не 200, то это ошибка
if (xhr.status != 200)
{
  // обработать ошибку
  console.log(xhr.status + ': ' + xhr.statusText );// пример вывода: 404: Not Found
} 
else 
{
  // вывести результат
  response = xhr.responseText; // responseText - текст ответа.
}

let json = JSON.parse(response);  //весь объект
let data = json.data;  //нужная инфа

let codes = data.map(el => el.code );
let symbols = data.map(el => el.symbol);
let names = data.map(el => el.name);

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