const fs = require('node:fs');

try {
  const data = fs.readFileSync('./input.txt', 'utf8');

  const seeds = data.split("\n")[0].split(": ")[1].split(" ");
  const destinationSourceMapping = data.split("\n\n");

  destinationSourceMapping.shift();

  const resultsMapping = [];

  destinationSourceMapping.forEach((mapping) => {
    // const mappingResult = {};

    // destination source range
    const values = mapping.split(":")[1].split("\n").filter((val) => val !== "");

    const rowMapping = [];

    values.forEach((value) => {
      const valueArr = value.split(" ");
      let destinationStart = Number(valueArr[0]);
      let sourceStart = Number(valueArr[1]);
      const rangeLength = Number(valueArr[2]);

      rowMapping.push({
        destinationStart,
        sourceStart,
        rangeLength
      })

      // resultsMapping.push()

      // for(let i=0;i<rangeLength;i++) {
      //   mappingResult[sourceStart] = destinationStart;
      //   destinationStart++;
      //   sourceStart++;
      // }
    })

    resultsMapping.push(rowMapping);
  })

  // console.log(resultsMapping)
  const seedsResult = [];

  seeds.forEach((seed) => {
    let finalRowResult = Number(seed);

    resultsMapping.forEach((resultMapping) => {
      for (let i = 0; i<resultMapping.length;i++) {
        const mapping = resultMapping[i];

        // check apakah seed berada di range destination dan source
        // 53 >= 53 && 53 <= 61
        const isInRange = (finalRowResult >= mapping.sourceStart) && (finalRowResult <= (mapping.sourceStart + mapping.rangeLength));

        if (isInRange) {
          // stop looping
          // set finalRowResult dengan
          // 53 + (-4) => 49
          finalRowResult = finalRowResult + (mapping.destinationStart - mapping.sourceStart)
          break;
        }

        // console.log(mapping)
        // console.log(finalRowResult, "<<<< finalRowResult")
      }
    })

    seedsResult.push(finalRowResult)
  })

  let answer = seedsResult[0];

  seedsResult.forEach((result) => {
    if (result < answer) {
      answer = result
    }
  })

  console.log(answer)

} catch(err) {
  console.log(err, "<<< err")
}