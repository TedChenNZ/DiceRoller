import React from "react";
import { Checkbox } from "nes-react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 0.5rem;
  padding-left: 0.5rem;
`;

interface ICheckboxInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  onSelect?: () => void;
}

const CheckboxInput = ({ label, name, ...inputProps }: ICheckboxInput) => {
  return (
    <Wrapper>
      <Checkbox id={name} label={label} {...inputProps} />
    </Wrapper>
  );
};

export default CheckboxInput;
