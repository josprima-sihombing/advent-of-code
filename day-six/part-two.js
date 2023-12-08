const fs = require('node:fs');
const getNumbers = require("../utils/get-numbers")

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const dataArr = data.split("\n");
  
  const time = Number(getNumbers(dataArr[0]).join(""));
  const record = Number(getNumbers(dataArr[1]).join(""));

  let answer = 0;

  for(let i=1;i<=time;i++) {
    if (i * (time - i) > record) {
      answer++
    }
  }

  console.log(answer)
} catch(err) {
  console.log(err)
}