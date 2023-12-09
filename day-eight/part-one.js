const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');

  const dataMap = {};

  const dataArr = data.split("\n\n");
  const instructions = dataArr[0];
  const mapItems = dataArr[1].split("\n");

  mapItems.forEach((mapItem) => {
    const mapItemArr = mapItem.split(" = ");
    const key = mapItemArr[0];
    const value = mapItemArr[1].split(", ").map((item) => item.replace(/\(|\)/, ""));

    dataMap[key] = {
      L: value[0],
      R: value[1],
    }
  })

  let currentKey = 'AAA';
  let step = 0;
  let stepIndex = 0;

  while(currentKey !== 'ZZZ') {
    if (stepIndex === instructions.length) {
      stepIndex = 0;
    }

    let instruction = instructions[stepIndex];

    if (dataMap[currentKey][instruction] === "ZZZ") {
      currentKey = 'ZZZ';
    } else {
      currentKey = dataMap[currentKey][instruction];
    }

    step++;
    stepIndex++;
  }

  console.log(step, "<<<< answer")

} catch(err) {
  console.log(err)
}