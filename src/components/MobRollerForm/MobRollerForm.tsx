import React from "react";
import { IMobDamageInput, convertMobDamageInputTypes } from "../../dndRolls";
import styled from "styled-components";
import TextInput from "./TextInput";
import CheckboxInput from "./Checkbox";
import { Button } from "nes-react";
import { rollDice } from "../../roll";

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
  onSubmit: (data: IMobDamageInput) => any;
}) => {
  const defaults = {
    mobSize: defaultValues.mobSize || defaultDefaultValues.mobSize,
    toHitMod: defaultValues.toHitMod || defaultDefaultValues.toHitMod,
    damageDice: defaultValues.damageDice || defaultDefaultValues.damageDice,
    ac: defaultValues.ac || defaultDefaultValues.ac,
    advantage: defaultValues.advantage,
    disadvantage: defaultValues.disadvantage,
    mobName: defaultValues.mobName || ""
  };

  const onFormSubmit = e => {
    const formElement: HTMLFormElement = e.target.form;
    if (!formElement.checkValidity()) {
      return;
    }
    const formData = new FormData(formElement);
    const data: Partial<IMobDamageInput> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    data.advantage = formElement.advantage.checked;
    data.disadvantage = formElement.disadvantage.checked;
    e.preventDefault();
    const inputs = convertMobDamageInputTypes(data);
    return onSubmit(inputs);
  };
  return (
    <Form onSubmit={onFormSubmit}>
      <TextInput
        label="Mob Name"
        name="mobName"
        type="text"
        defaultValue={defaults.mobName}
        autoFocus
      />
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
      <CheckboxInput
        id="advantage"
        label="Advantage"
        defaultChecked={defaults.advantage}
      />
      <CheckboxInput
        id="disadvantage"
        label="Disadvantage"
        defaultChecked={defaults.disadvantage}
      />
      {
        // @ts-ignore
        <Button onClick={onFormSubmit}>Roll Dice</Button>
      }
    </Form>
  );
};

export default MobRollerForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;
