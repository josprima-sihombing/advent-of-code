const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const rows = data.split("\n");

  let total = 0;

  rows.forEach((row, rowIndex) => {
    const myNumbers = row.split(" | ")[1].split(" ").filter((value) => value !== "");
    const winningNumbers = row.split(" | ")[0].split(": ")[1].split(" ").filter((value) => value !== "");;

    let cardPoint = 0;

    myNumbers.forEach((myNumber) => {
      winningNumbers.forEach((winNumber) => {
        if (!isNaN(myNumber) && !isNaN(winNumber) && winNumber === myNumber) {
          if (cardPoint === 0) {
            cardPoint = 1;
          } else {
            cardPoint = cardPoint * 2;
          }
        }
      })
    })

    // console.log(myNumbers, winningNumbers, cardPoint, `<<< row ${rowIndex}`)

    total += cardPoint;
  })

  console.log(total)
} catch(err) {

}