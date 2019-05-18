export type RollResult = {
  result: number;
  originalRolls: number[];
  rollCount: number;
  diceCount: number;
  sides: number;
  highestLowest: string;
  modifier: string;
  input: string;
};

export function simpleRoll(input: string, average: boolean = false) {
  const { diceCount, sides, modifier = 0 } = parseDiceRoll(input);
  const rolls: number[] = [];
  if (diceCount && sides) {
    rolls.push(...rollDice(diceCount, sides, average));
  }
  const sum = rolls.reduce((prev, curr) => prev + curr, 0) + modifier;
  return {
    sum,
    rolls
  };
}

function parseDiceRoll(
  input: string
): {
  rollCount?: number;
  diceCount?: number;
  sides?: number;
  highestLowest?: string;
  modifier?: number;
} {
  const diceRollRegex = /(?:(\d+)\s*X\s*)?(\d*)D(\d*)\s*([+-]\s*[LH])?\s*([+\/*-]\s*\d+)?/i;
  const regexResult = input.match(diceRollRegex);
  if (!regexResult) {
    return {};
  }
  let [
    originalString,
    rollCount,
    diceCount,
    sides,
    highestLowest,
    modifier
  ] = regexResult;
  return {
    rollCount: stringToInt(rollCount),
    diceCount: stringToInt(diceCount),
    sides: stringToInt(sides),
    highestLowest,
    modifier: stringToInt(modifier)
  };
}

export function rollDice(diceCount: number, sides: number, average = false) {
  const diceRolls: number[] = [];
  if (diceCount && sides) {
    for (let i = 0; i < diceCount; i++) {
      if (average) {
        diceRolls.push((sides + 1) / 2);
      } else {
        diceRolls.push(Math.ceil(Math.random() * sides));
      }
    }
    return diceRolls;
  }
  return [];
}

export function stringToInt(string: string): number | undefined {
  return string ? parseInt(string.replace(/\s/g, ""), 10) : undefined;
}
