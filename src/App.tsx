import React, { useState } from "react";
import "reset-css";
import { IMobDamageResult, rollMobDamageResults } from "./dndRolls";
import * as styles from "./styles.scss";
import MobResult from "./components/MobResults/MobResult";
import MobRollerForm from "./components/MobRollerForm/MobRollerForm";
import queryString from "query-string";

const onComponentMount = (onMount: () => void) => {
  const [mounted, setMount] = useState(false);
  if (!mounted) {
    onMount();
    setMount(true);
  }
};

const App = () => {
  const [defaultValues, setDefaultValues] = useState({});
  const [history, setHistory] = useState([] as IMobDamageResult[]);
  onComponentMount(() => {
    const {
      mobDamageResult: mobDamageResultBase64,
      ...defaults
    } = queryString.parse(location.search);
    setDefaultValues(defaults);
    let mobDamageResult;
    try {
      if (mobDamageResultBase64) {
        mobDamageResult = JSON.parse(atob(mobDamageResultBase64));
      }
    } catch {}
    const newHistory = mobDamageResult
      ? [mobDamageResult, ...history]
      : history;
    setHistory(newHistory);
  });

  const onSubmit = (e: any) => {
    const formElement: HTMLFormElement = e.target.form;
    if (!formElement.checkValidity()) {
      return;
    }
    const inputs = {
      mobSize: parseInt(formElement.mobSize.value, 10),
      toHitMod: parseInt(formElement.toHitMod.value, 10),
      damageDice: formElement.damageDice.value,
      ac: parseInt(formElement.ac.value, 10),
      advantage: formElement.advantage.checked,
      disadvantage: formElement.disadvantage.checked
    };
    e.preventDefault();
    const mobDamageResult = rollMobDamageResults(inputs);
    setHistory([mobDamageResult, ...history]);
    const url = queryString.parseUrl(location.href).url;
    window.history.pushState(
      inputs,
      document.title,
      `${url}?${queryString.stringify({
        ...inputs,
        mobDamageResult: btoa(JSON.stringify(mobDamageResult))
      })}`
    );
  };

  const mobResult = history && history.length ? history[0] : undefined;
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>D&amp;D Mob Roller</h1>
      <div className={styles.input}>
        <MobRollerForm defaultValues={defaultValues} onSubmit={onSubmit} />
        <MobResult mobResult={mobResult} />
      </div>
    </div>
  );
};

export default App;
