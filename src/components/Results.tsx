import React from 'react';
import { RollResult } from '../roll';
import styles from './results.scss';

const Results = ({ rollResult }: { rollResult?: RollResult[] }) => {
  if (rollResult && rollResult.length) {
    return (
      <div>
        {
          rollResult.map((res, i) => {
            return (
              <div key={i}>
                <div className={styles.originalRolls}>
                  {
                    res.originalRolls.map((roll, j) => {
                      return (
                        <div key={j}>{roll}</div>
                      )
                    })
                  }
                </div>
                {
                  res.modifier ?
                    <div className={styles.modifier}>
                      {res.modifier}
                    </div>
                    : null
                }
                <div className={styles.result}>
                  <span>=</span>
                  <h3>{res.result}</h3>

                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
  return null;
}

export default Results;