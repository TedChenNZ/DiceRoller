import React from "react";
import { IMinionRoll } from "../../dndRolls";
import styled from "styled-components";
import monsterImage from "../../assets/icons/monster.png";
import hitImage from "../../assets/icons/hit.png";
import missImage from "../../assets/icons/miss.png";
import damageImage from "../../assets/icons/damage.png";

const Wrapper = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  img {
    height: 1rem;
  }
  p {
    padding-left: 0.5rem;
  }
`;

const Rolls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 0.5rem;
`;

const MinionResult = ({ minionRoll }: { minionRoll: IMinionRoll }) => {
  const { attackRolls, damageRolls, hit, toHit, damage } = minionRoll;
  return (
    <Wrapper style={{ opacity: hit ? 1 : 0.25 }}>
      <Rolls style={{ width: "7rem" }}>
        <img src={hit ? hitImage : missImage} />
        <p>[{attackRolls.join(", ")}]</p>
        <p>{toHit}</p>
      </Rolls>
      <Rolls>
        <img src={damageImage} />
        <p>[{damageRolls.join(", ")}]</p>
        <p>{damage}</p>
      </Rolls>
    </Wrapper>
  );
};

export default MinionResult;
