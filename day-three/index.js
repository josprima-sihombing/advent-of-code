const fs = require('node:fs');

function isValid(rows, rowIndex, i, num) {
  let isValid = false;

  for (let j=rowIndex - 1 ;j<=rowIndex + 1;j++) {
    for (let k=i-num.length-1;k<=i;k++) {
      // If symbol found
      // console.log(j, k, '<<<<')
      if (rows[j] && rows[j][k] && rows[j][k] !== "." && isNaN(rows[j][k])) {
        isValid = true;
      }
    }
  }

  return isValid;
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const rows = data.split("\n");
  const nums = [];

  // console.log(rows)

  let num = '';

  rows.forEach((row, rowIndex) => {
    if (num !== '' && isValid(rows, rowIndex, row.length, num)) {
      nums.push(num);
      num = '';
    }

    for (let i = 0;i<row.length;i++) {
      if (!isNaN(row[i])) {
        num += row[i]
      } else {
        if (num !== '') {
          if (isValid(rows, rowIndex, i, num)) {
            nums.push(num)
          }
        }

        num = '';
      }
    }
  })

  if (num !== '' && isValid(rows, rows.length - 1, rows[rows.length - 1].length, num)) {
    nums.push(num);
  }

  let total = 0;

  nums.forEach((num) => {
    total += Number(num)
  })

  // console.log(nums)

  console.log(total)
} catch(error) {
  console.log(error)
}