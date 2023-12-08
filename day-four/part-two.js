const fs = require('node:fs');


// TODO: Fix recursive logic to match with problem.
function getTotalScratchCards(rows) {
  if (rows.length === 0) {
    return 0;
  }

  const myNumbers = rows[0].split(" | ")[1].split(" ").filter((value) => value !== "");
  const winningNumbers = rows[0].split(" | ")[0].split(": ")[1].split(" ").filter((value) => value !== "");

  let matchedCard = 0;

  myNumbers.forEach((myNumber) => {
    winningNumbers.forEach((winNumber) => {
      if (!isNaN(myNumber) && !isNaN(winNumber) && winNumber === myNumber) {
        matchedCard++;
      }
    })
  })

  rows.shift()

  return matchedCard + getTotalScratchCards(rows)
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const rows = data.split("\n");

  const totalScratchCards = getTotalScratchCards(rows);

  console.log(totalScratchCards, "<<<<")
} catch(err) {
  console.log(err, "<<< err")
}