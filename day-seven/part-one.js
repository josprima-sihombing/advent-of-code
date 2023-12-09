const fs = require('node:fs');

const cardOrder = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

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