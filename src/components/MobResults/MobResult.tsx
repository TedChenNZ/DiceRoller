import React from "react";
import { IMobDamageResult } from "../../dndRolls";
import styled from "styled-components";
import MinionResult from "./MinionResult";

const Wrapper = styled.div`
  padding: 0.5rem;
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
      <div>
        {minionRolls.map((minionRoll, i) => {
          return <MinionResult key={i} minionRoll={minionRoll} />;
        })}
      </div>
    </Wrapper>
  );
};
export default MobResult;
