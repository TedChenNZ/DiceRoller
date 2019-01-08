import React, { useState } from 'react';
import roll, { RollResult } from './roll';
import Results from './components/Results';
import * as styles from './styles.scss';
import ResultsHistory from './components/ResultsHistory';

const App = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([] as RollResult[][]);
  const onClick = (e: any) => {
    e.preventDefault();
    const inputElement = document.getElementById('input') as HTMLInputElement;
    if (inputElement && inputElement.value) {
      setInput(inputElement.value);
      const result = roll(inputElement.value);
      const newHistory = [result, ...history];
      setHistory(newHistory);
    }
  }
  console.log(input, history);
  const result = history && history.length ? history[0] : undefined;
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>D&amp;D Dice Roller</h1>
      <div className={styles.input}>
        <form onSubmit={onClick}>
          <input id='input' className={styles.box} autoFocus type="text" defaultValue='2d6 + 1'></input>
          <button onClick={onClick} >Roll Dice</button>
        </form>
        <Results rollResult={result} />
        <ResultsHistory history={history} />
      </div>
    </div>
  )
}

export default App;