
export type RollResult = {
  result: number,
  originalRolls: number[],
  rollCount: number,
  diceCount: number,
  sides: number,
  highestLowest: string,
  modifier: string,
  input: string,
}
export default function roll(input: string, average = false) {
  // Based on https://rgxdb.com/r/QB4A72T
  const diceRollRegex = /(?:(\d+)\s*X\s*)?(\d*)D(\d*)\s*([+-]\s*[LH])?\s*([+\/*-]\s*\d+)?/i;
  const regexResult = input.match(diceRollRegex);
  if (!regexResult) {
    return [];
  }
  let [, rollCount, diceCount, sides, highestLowest, modifier] = regexResult;
  console.log(rollCount, diceCount, sides, highestLowest, modifier);
  const getResult = () => {
    let result = 0;
    const originalRolls = rollDice(stringToInt(diceCount), stringToInt(sides), average);
    let rolls = [...originalRolls];
    if (highestLowest && rolls.length) {
      rolls.sort();
      if (isAddition(highestLowest)) {
        // This means we only take the highest or lowest result
        if (highestLowest.toLowerCase().includes('l')) {
          rolls.splice(0, 1);
        } else {
          rolls.splice(rolls.length - 1, 1);
        }
      }
    }
    const sum = (accumulator: number, current: number) => accumulator + current;
    result = rolls.reduce(sum);

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
    return {
      result,
      originalRolls,
      rollCount: stringToInt(rollCount),
      diceCount: stringToInt(diceCount),
      sides: stringToInt(sides),
      highestLowest,
      modifier,
      input
    } as RollResult;
  }
  const results: RollResult[] = [];
  // const rolls = stringToInt(rollCount) || 1;
  const rolls = 1;
  for (let i = 0; i < rolls; i++) {
    results.push(getResult());
  }
  console.log(results);
  return results;
}

function rollDice(diceCount?: number, sides?: number, average = false) {
  const diceRolls: number[] = [];
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

function stringToInt(string?: string) {
  return string ? parseInt(string, 10) : undefined;
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
