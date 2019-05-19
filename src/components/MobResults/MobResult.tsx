import React from "react";
import { IMobDamageResult } from "../../dndRolls";
import styled from "styled-components";
import MinionResult from "./MinionResult";

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobResult = ({ mobResult }: { mobResult?: IMobDamageResult }) => {
  if (!mobResult) {
    return null;
  }
  const { minionRolls, totalHits, totalDamage } = mobResult;
  return (
    <Wrapper>
      <Wrapper>
        <p>Total Hits: {totalHits}</p>
        <p>Total Damage: {totalDamage}</p>
      </Wrapper>
      <table>
        <tbody>
          {minionRolls.map((minionRoll, i) => {
            return <MinionResult key={i} minionRoll={minionRoll} />;
          })}
        </tbody>
      </table>
    </Wrapper>
  );
};
export default MobResult;
