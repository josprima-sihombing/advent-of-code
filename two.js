const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input-two.txt', 'utf8');
  const rows = data.split("\n");

  let total = 0;

  rows.forEach((row) => {
    // let gameId = Number(row.split(":")[0].split(" ")[1]);
    let turns = row.split(": ")[1].split("; ");

    const cube = {
      red: 1,
      green: 1,
      blue: 1,
    };

    turns.forEach((turn) => {
      const games = turn.split(", ");

      games.forEach((game) => {
        const value = Number(game.split(" ")[0]);
        const key = game.split(" ")[1];

        if (value > cube[key]) {
          cube[key] = value
        }
      })
    })

    total += cube.red * cube.green * cube.blue
  })

  console.log(total)

} catch(error) {
  console.log(error)
}