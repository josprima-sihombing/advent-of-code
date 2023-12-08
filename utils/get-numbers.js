module.exports = function getNumbers(value) {
  const numbers = [];

  let number = '';

  for (let i=0;i<value.length;i++) {
    if (value[i] !== " " && !isNaN(value[i])) {
      number += value[i];
    } else {
      if (number.length > 0) {
        numbers.push(number);
        number = ''
      }
    }
  }

  if (number.length > 0) {
    numbers.push(number);
  }

  return numbers;
}
