import React, { useState } from "react";
import "reset-css";
import { IMobDamageResult, rollMobDamageResults } from "./dndRolls";
import * as styles from "./styles.scss";
import MobResult from "./components/MobResults/MobResult";

const App = () => {
  const [history, setHistory] = useState([] as IMobDamageResult[]);
  const onSubmit = (e: any) => {
    const form: HTMLFormElement = e.target.form;
    if (!form.checkValidity()) {
      return;
    }
    const inputs = {
      mobSize: parseInt(form.mobSize.value, 10),
      toHitMod: parseInt(form.toHitMod.value, 10),
      damageDice: form.damageDice.value,
      ac: parseInt(form.ac.value, 10),
      advantage: form.advantage.checked,
      disadvantage: form.disadvantage.checked
    };
    e.preventDefault();
    const mobDamageResult = rollMobDamageResults(inputs);
    setHistory([mobDamageResult, ...history]);
  };
  const mobResult = history && history.length ? history[0] : undefined;
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>D&amp;D Mob Roller</h1>
      <div className={styles.input}>
        <form onSubmit={onSubmit}>
          <label htmlFor="mobSize">Mob Size</label>
          <input
            id="mobSize"
            name="mobSize"
            className={styles.box}
            autoFocus
            type="number"
            defaultValue="10"
            required
          />

          <label htmlFor="toHitMod">To Hit Mod</label>
          <input
            id="toHitMod"
            name="toHitMod"
            className={styles.box}
            type="number"
            defaultValue="4"
            required
          />

          <label htmlFor="damageDice">Damage Dice</label>
          <input
            id="damageDice"
            name="damageDice"
            className={styles.box}
            type="text"
            defaultValue="1d6 + 1"
            required
          />

          <label htmlFor="ac">Target AC</label>
          <input
            id="ac"
            name="ac"
            className={styles.box}
            type="number"
            defaultValue="12"
            required
          />

          <label htmlFor="advantage">Advantage</label>
          <input id="advantage" name="advantage" type="checkbox" />

          <label htmlFor="disadvantage">Disadvantage</label>
          <input id="disadvantage" name="disadvantage" type="checkbox" />

          <button onClick={onSubmit}>Roll Dice</button>
        </form>
        <MobResult mobResult={mobResult} />
      </div>
    </div>
  );
};

export default App;
