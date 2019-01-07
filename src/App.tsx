import React, { useState } from 'react';
import roll from './roll';

export default function App() {
  const [input, setInput] = useState('');
  const result = roll(input);
  console.log(result);
  const onClick = (e: any) => {
    console.log(e);
    e.preventDefault();
    const inputElement = document.getElementById('input') as HTMLInputElement;
    if (inputElement) {
      setInput(inputElement.value ? inputElement.value : '');
    }
  }
  return (
    <div>
      <input id='input'></input>
      <button onClick={onClick}>Roll Dice</button>
      <div>
        {
          result && result.length &&
          result.map(res => {
            return (
              <div>
                {res.result}
                {
                  res.originalRolls.map(roll => {
                    return (
                      <div>{roll}</div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}