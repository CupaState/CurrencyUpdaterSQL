//В этом файле получаем данные и отправляем в 1.json

let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
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
  // вывести результат в переменную
  response = xhr.responseText; // responseText - текст ответа.
}

fs.writeFileSync("1.json", response);

let json = JSON.parse(response);  //весь объект

let arr = json.data;  //нужная инфа

let codes = new Array();
let symbols = new Array();
let names = new Array();

codes = arr.map(el => el.code );
console.log(codes);

symbols = arr.map(el => el.symbol);
console.log(symbols);

names = arr.map(el => el.name);
console.log(names);


