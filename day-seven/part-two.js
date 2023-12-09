const fs = require('node:fs');

const cardOrder = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

const getCardPoint = (value) => {
  const obj = {}
  let cardPoint;

  for (let i=0;i<value.length;i++) {
    if (obj[value[i]]) {
      obj[value[i]]++
    } else {
      obj[value[i]] = 1
    }
  }

  const objKeys = Object.keys(obj);

  if (objKeys.length === 1) {
    cardPoint = 5
  } else if (objKeys.length === 2) {
    if (obj[objKeys[0]] === 1 || obj[objKeys[1]] === 1) {
      cardPoint = 4
    } else {
      cardPoint = 3
    }
  } else if (objKeys.length === 3) {
    if (obj[objKeys[0]] === 3 || obj[objKeys[1]] === 3 || obj[objKeys[2]] === 3) {
      cardPoint = 2
    } else {
      cardPoint = 1
    }
  } else if (objKeys.length === 4) {
    cardPoint = 0
  } else {
    cardPoint = -1
  }

  // JJJJA -> 4
  // AAAAJ -> 5
  // should be 5

  // 23332
  // J333J
  // 2JJJ2

  // TTT98
  // TTTJ8
  // JJJ98

  // 23432
  // 23J32 -> 3
  // J343J -> 4
  // 2J4J2 -> 4

  // A23A4
  // AJ3A4 -> 2
  // J23J4 -> 2

  // 23456
  // J3456 -> 

  if (cardPoint === 4) {
    if (obj["J"] === 1 || obj["J"] === 4) {
      cardPoint = 5
    }
  } else if (cardPoint === 3) {
    if (obj["J"] === 2 || obj["J"] === 3) {
      cardPoint = 5
    }
  } else if (cardPoint === 2) {
    if (obj["J"] === 1 || obj["J"] === 3) {
      cardPoint = 4;
    }
  } else if (cardPoint === 1) {
    if (obj["J"] === 2) {
      cardPoint = 4
    } else if (obj["J"] === 1) {
      cardPoint = 3
    }
  } else if (cardPoint === 0) {
    if (obj["J"] === 1 || obj["J"] === 2) {
      cardPoint = 2
    }
  } else if (cardPoint === -1 && obj["J"] === 1) {
    cardPoint = 0;
  }

  return cardPoint;
}

try {
  const data = fs.readFileSync('./input.txt', 'utf8');
  const items = data.split("\n");

  items.sort((a, b) => {
    const aCard = a.split(" ")[0];
    const bCard = b.split(" ")[0];

    const aCardPoint = getCardPoint(aCard);
    const bCardPoint = getCardPoint(bCard);

    if (aCardPoint > bCardPoint) {
      return 1;
    } else if (aCardPoint < bCardPoint) {
      return -1;
    } else {
      let index = 0;

      while (aCard[index] === bCard[index] && index < 5) {
        index++
      }

      if (index === 5) {
        return 0;
      }

      const aIndex = cardOrder.findIndex((value) => value === aCard[index]);
      const bIndex = cardOrder.findIndex((value) => value === bCard[index]);

      if (aIndex < bIndex) {
        return 1
      }

      return -1;
    }
  })

  let answer = 0;

  items.forEach((item, index) => {
    const value = Number(item.split(" ")[1]);

    answer += value * (index + 1)
  })

  console.log(answer)
} catch(err) {
  console.log(err)
}