import { sortWith, ascend } from "ramda";
import { rollDice, simpleRoll } from "./roll";

export interface IMinionRoll {
  attackRolls: number[];
  damageRolls: number[];
  toHit: number;
  hit: boolean;
  damage: number;
  criticalSuccess: boolean;
  criticalFail: boolean;
}

export interface IMobDamageInput {
  mobSize: number;
  toHitMod: number;
  damageDice: string;
  ac: number;
  advantage: boolean;
  disadvantage: boolean;
  average?: boolean;
  mobName?: string;
}

export interface IMobDamageResult {
  minionRolls: IMinionRoll[];
  totalHits: number;
  totalDamage: number;
}

export function rollAttack({
  toHitMod,
  ac,
  advantage,
  disadvantage
}: {
  toHitMod: number;
  ac: number;
  advantage: boolean;
  disadvantage: boolean;
}) {
  const rollOnce = (!advantage && !disadvantage) || (advantage && disadvantage);
  const attackRolls: number[] = sortWith(
    [ascend(i => i)],
    rollDice(rollOnce ? 1 : 2, 20)
  );

  const attackRoll = attackRolls[rollOnce || disadvantage ? 0 : 1];
  const criticalFail = attackRoll === 1;
  return {
    attackRolls,
    hit: criticalFail ? false : (attackRoll + toHitMod >= ac),
    toHit: attackRoll + toHitMod,
    criticalSuccess: attackRoll === 20,
    criticalFail,
  };
}

export function rollMobDamageResults({
  mobSize,
  toHitMod,
  damageDice,
  ac,
  advantage,
  disadvantage,
  average
}: IMobDamageInput): IMobDamageResult {
  const calculateMinionRoll: () => IMinionRoll = () => {
    const attackRoll = rollAttack({
      toHitMod,
      ac,
      advantage,
      disadvantage
    });
    const damageRoll = simpleRoll(damageDice, attackRoll.criticalSuccess, average);
    return {
      ...attackRoll,
      damageRolls: damageRoll.rolls,
      damage: attackRoll.hit ? damageRoll.sum : 0,
    };
  };
  if (mobSize > 500) {
    throw new Error("Mob size cannot be over 500");
  }
  const minionResults: IMinionRoll[] = [];
  for (let i = 0; i < mobSize; i++) {
    minionResults.push(calculateMinionRoll());
  }
  return {
    minionRolls: minionResults,
    totalHits: minionResults.filter(r => r.hit).length,
    totalDamage: minionResults
      .filter(r => r.hit)
      .map(r => r.damage)
      .reduce((prev, curr) => prev + curr, 0)
  };
}

export function convertMobDamageInputTypes(input) {
  const {
    mobSize,
    toHitMod,
    damageDice,
    ac,
    advantage,
    disadvantage,
    ...rest
  } = input;
  return {
    mobSize: parseInt(mobSize, 10),
    toHitMod: parseInt(toHitMod, 10),
    damageDice: damageDice,
    ac: parseInt(ac, 10),
    advantage: parseBoolean(advantage),
    disadvantage: parseBoolean(disadvantage),
    ...rest
  };
}

export function parseBoolean(input?: string | boolean) {
  if (typeof input === "boolean") {
    return input;
  }
  return input === "true" || input === "on";
}
