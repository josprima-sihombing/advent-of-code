const fs = require('node:fs');
const numbers = "one,two,three,four,five,six,seven,eight,nine".split(",");

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const rows = data.split("\n");
  let total = 0;

  rows.forEach((row) => {
    let start;
    let end;

    for (let i = 0; i < row.length; i++) {
      if (!isNaN(row[i])) {
        start = Number(row[i]);
        break;
      }

      let isValid = false;

      for (let j = 0; j < numbers.length; j++) {
        if (numbers[j] === row.slice(i, numbers[j].length + i)) {
          start = j + 1;
          isValid = true;
          break;
        }
      }

      if (isValid) {
        break;
      }
    }

    for (let i = row.length - 1; i >= 0; i--) {
      if (!isNaN(row[i])) {
        end = Number(row[i]);
        break;
      }

      let isValid = false;

      for (let j = 0; j < numbers.length; j++) {
        if (numbers[j] === row.slice(i - numbers[j].length + 1, i + 1)) {
          end = j + 1;
          isValid = true;
          break;
        }
      }

      if (isValid) {
        break;
      }
    }

    total += start * 10 + end;
  })

  console.log(total)
} catch (err) {
  console.error(err);
}