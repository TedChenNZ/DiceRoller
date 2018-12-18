
export function roll(input: string, average = false) {
  // Based on https://rgxdb.com/r/QB4A72T
  const diceRollRegex = /(?:(\d+)\s*X\s*)?(\d*)D(\d*)\s*([+-]\s*[LH])?\s*([+\/*-]\s*\d+)?/i;
  const regexResult = input.match(diceRollRegex);
  let [, rollCount, diceCount, sides, highestLowest, modifier] = regexResult;

  const getResult = () => {
    let result = 0;
    let diceRollResults = rollDice(stringToInt(diceCount), stringToInt(sides), average);
    if (highestLowest && diceRollResults.length) {
      diceRollResults.sort();
      if (isAddition(highestLowest)) {
        // This means we only take the highest or lowest result
        if (highestLowest.toLowerCase().includes('l')) {
          diceRollResults = diceRollResults[0];
        } else {
          diceRollResults = diceRollResults[diceRollResults.length - 1];
        }
      }
    }
    const sum = (accumulator, current) => accumulator + current;
    result = diceRollResults.reduce(sum);

    if (modifier) {
      const modifierNumber = getNumber(modifier);
      if (modifierNumber) {
        if (isAddition(modifier)) {
          result += modifierNumber;
        } else {
          result -= modifierNumber;
        }
      }
    }
    return result;
  }
  const results = [];
  const rolls = stringToInt(rollCount) || 1;
  for (let i = 0; i < rolls; i++) {
    results.push(getResult());
  }
  console.log(results);
  return results;
}

function rollDice(diceCount: number, sides: number, average = false) {
  const diceRolls = [];
  if (diceCount && sides) {
    for (let i = 0; i < diceCount; i++) {
      if (average) {
        diceRolls.push((sides + 1) / 2);
      } else {
        diceRolls.push(Math.ceil((Math.random() * sides)));
      }
    }
    return diceRolls;
  }
  return [];
}

function stringToInt(string: string) {
  return string ? parseInt(string, 10) : null;
}

function isAddition(string: string) {
  return string.includes('+');
}

function getNumber(string: string) {
  const results = string.match(/\d+/g);
  if (results && results.length) {
    return stringToInt(results[0]);
  }
  return null;
}
