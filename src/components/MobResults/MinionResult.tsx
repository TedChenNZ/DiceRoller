import React from "react";
import { IMinionRoll } from "../../dndRolls";
import styled from "styled-components";
import hitImage from "../../assets/icons/hit.png";
import missImage from "../../assets/icons/miss.png";
import damageImage from "../../assets/icons/damage.png";
import { RollResult } from "../../roll";

const MinionResultWrapper = styled.tr.attrs((props: any) => {
  return {
    hit: props.hit,
    criticalSuccess: props.criticalSuccess,
    criticalFail: props.criticalFail,
  }
})`
  font-size: 0.6rem;
  opacity: ${props => props.hit ? 1 : 0.25};
  color: ${props => {
    if (props.criticalSuccess) {
      return 'green';
    }
    if (props.criticalFail) {

      return 'red';
    }
    return 'inherit';
  }};
  font-weight: ${props => props.criticalSuccess || props.criticalFail ? 700 : 'inherit'};

  td {
    padding: 1em 0;
    vertical-align: middle;
  }

  img {
    height: 1.5em;
    padding: 0 1em;
  }
`;

const RollResult = styled.span`
  padding-right: 1em;
`;

const MinionResult = ({ minionRoll }: { minionRoll: IMinionRoll }) => {
  const { attackRolls, damageRolls, hit, toHit, damage, criticalSuccess, criticalFail } = minionRoll;
  return (
    <MinionResultWrapper hit={hit} criticalSuccess={criticalSuccess} criticalFail={criticalFail}>
      <td>
        <img
          src={hit ? hitImage : missImage}
          alt={hit ? "Hit" : "Miss"}
          title={hit ? "Hit" : "Miss"}
        />
      </td>
      <td>
        <RollResult>{toHit}</RollResult>
      </td>
      <td>
        <span>[{attackRolls.join(", ")}]</span>
      </td>

      <td style={{ paddingLeft: "3em" }}>
        <img src={damageImage} alt={"Damage"} title={"Damage"} />
      </td>
      <td>
        <RollResult>{damage}</RollResult>
      </td>
      <td>
        <span>[{damageRolls.join(", ")}]</span>
      </td>
    </MinionResultWrapper>
  );
};

export default MinionResult;
