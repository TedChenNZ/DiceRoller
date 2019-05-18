import React from "react";
import { IMobDamageInput } from "../../dndRolls";

interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const TextInput = ({ label, name, ...inputProps }: ITextInput) => {
  return (
    <React.Fragment>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} {...inputProps} />
    </React.Fragment>
  );
};

const defaultDefaultValues = {
  mobSize: 10,
  toHitMod: 4,
  damageDice: "1d6 + 2",
  ac: 15,
  advantage: false,
  disadvantage: false,
  average: false
};
const MobRollerForm = ({
  defaultValues,
  onSubmit
}: {
  defaultValues;
  onSubmit: (e) => any;
}) => {
  const defaults = {
    mobSize: defaultValues.mobSize || defaultDefaultValues.mobSize,
    toHitMod: defaultValues.toHitMod || defaultDefaultValues.toHitMod,
    damageDice: defaultValues.damageDice || defaultDefaultValues.damageDice,
    ac: defaultValues.ac || defaultDefaultValues.ac,
    advantage: defaultValues.advantage,
    disadvantage: defaultValues.disadvantage
  };
  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label="Mob Size"
        name="mobSize"
        type="number"
        defaultValue={defaults.mobSize}
        required
        max="100"
        autoFocus
      />
      <TextInput
        label="To Hit Mod"
        name="toHitMod"
        type="number"
        defaultValue={defaults.toHitMod}
        required
      />
      <TextInput
        label="Damage Dice"
        name="damageDice"
        type="text"
        defaultValue={defaults.damageDice}
        required
      />
      <TextInput
        label="Target AC"
        name="ac"
        type="number"
        defaultValue={defaults.ac}
        required
      />

      <label htmlFor="advantage">Advantage</label>
      <input
        id="advantage"
        name="advantage"
        type="checkbox"
        defaultChecked={defaults.advantage}
      />

      <label htmlFor="disadvantage">Disadvantage</label>
      <input
        id="disadvantage"
        name="disadvantage"
        type="checkbox"
        defaultChecked={defaults.disadvantage}
      />

      <button onClick={onSubmit}>Roll Dice</button>
    </form>
  );
};

export default MobRollerForm;
