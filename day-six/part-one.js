const fs = require('node:fs');
const getNumbers = require("../utils/get-numbers")

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const dataArr = data.split("\n");
  
  const times = getNumbers(dataArr[0])
  const records = getNumbers(dataArr[1]);

  let answer = 1;

  times.forEach((time, index) => {
    const record = Number(records[index]);
    const finishTime = Number(time);

    let count = 0;

    for(let i=1;i<=finishTime;i++) {
      if (i * (finishTime - i) > record) {
        count++
      }
    }

    answer *= count
  })

  console.log(answer)
} catch(err) {
  console.log(err)
}