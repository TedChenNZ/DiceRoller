import React from 'react';
import { RollResult } from '../../roll';

const ResultsHistory = ({ history }: { history?: RollResult[][] }) => {
  if (history && history.length) {
    return (

      <div>
        <h3>Previous Rolls</h3>
        {
          history.map((his, i) => {
            return (
              <div key={i}>
                {his.map((rollResult, j) => {
                  return (
                    <div key={j}>
                      {rollResult.input} = {`(${rollResult.originalRolls.join(' + ')})${rollResult.modifier ? ' ' + rollResult.modifier : ''}`} = {rollResult.result}
                    </div>
                  )
                })}
              </div>
            )
          })
        }
      </div>

    );
  }
  return null;
}

export default ResultsHistory;