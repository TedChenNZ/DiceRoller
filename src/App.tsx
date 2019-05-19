import React, { useState } from "react";
import {
  IMobDamageResult,
  rollMobDamageResults,
  IMobDamageInput
} from "./dndRolls";
import MobResult from "./components/MobResults/MobResult";
import MobRollerForm from "./components/MobRollerForm/MobRollerForm";
import queryString from "query-string";
import styled from "styled-components";
import { convertMobDamageInputTypes } from "./dndRolls";

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

  const updateStateFromQueryString = () => {
    const {
      mobDamageResult: mobDamageResultBase64,
      ...defaults
    } = queryString.parse(location.search);
    setDefaultValues(convertMobDamageInputTypes(defaults));
    let mobDamageResult;
    try {
      if (mobDamageResultBase64) {
        mobDamageResult = JSON.parse(atob(mobDamageResultBase64));
      }
    } catch {}
    const newHistory = mobDamageResult
      ? // ? [mobDamageResult, ...history]
        [mobDamageResult]
      : history;
    setHistory(newHistory);
  };

  onComponentMount(updateStateFromQueryString);
  window.onpopstate = updateStateFromQueryString;

  const onSubmit = (inputs: IMobDamageInput) => {
    const mobDamageResult = rollMobDamageResults(inputs);
    setHistory([mobDamageResult, ...history]);
    const url = queryString.parseUrl(location.href).url;
    // const encodedMobDamageResult = btoa(JSON.stringify(mobDamageResult));
    const newHref = `${url}?${queryString.stringify({
      ...inputs
      // mobDamageResult:
      //   encodedMobDamageResult.length >= 2000
      //     ? undefined
      //     : encodedMobDamageResult
    })}`;
    if (location.href !== newHref) {
      window.history.pushState(inputs, document.title, newHref);
    }
  };

  const Link = styled.a`
    color: #212529;
    text-decoration: none;

    &:hover {
      color: #adafbc;
      text-decoration: none;
    }
  `;

  const mobResult = history && history.length ? history[0] : undefined;
  return (
    <AppWrapper>
      <Container>
        <Link href="/">
          <h1>D&amp;D Mob Roller</h1>
        </Link>
        <div>
          <MobRollerForm defaultValues={defaultValues} onSubmit={onSubmit} />
          <MobResult mobResult={mobResult} />
        </div>
      </Container>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 3rem;
    text-align: center;
  }

  @media (min-width: 576px) {
    max-width: 576px;
  }
`;
