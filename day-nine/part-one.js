const fs = require('node:fs');

const getArrDiff = (arr) => {
  const diff = [];

  for(let i=0;i<arr.length - 1;i++) {
    diff.push(arr[i + 1] - arr[i]);
  }

  return diff;
}

const isAllZero = (arr) => {
  let isValid = true;

  arr.forEach((item) => {
    if (item !== 0) {
      isValid = false;
    }
  })

  return isValid;
}

try {
  const sequences = fs.readFileSync('./input.txt', 'utf8').split("\n");

  let answer = 0;

  sequences.forEach((sequence) => {
    const numbers = sequence.split(" ").map((num) => Number(num));

    const processes = [
      [...numbers]
    ];

    let index = 0;

    while(!isAllZero(processes[index])) {
      processes.push(getArrDiff(processes[index]));
      index++;
    }

    // get next sequence
    for (let i=processes.length - 2;i>=0;i--) {
      let aValue = processes[i+1][processes[i+1].length - 1];
      let bValue = processes[i][processes[i].length - 1];

      processes[i].push(aValue + bValue);
    }

    answer += processes[0][processes[0].length - 1]
  })

  console.log(answer)

} catch (err) {
  console.log(err)
}