import React from "react";
import { TextInput as NesTextInput } from "nes-react";
import styled from "styled-components";

const Wrapper = styled.div`
  padding-right: 4px;
`;
interface ITextInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value?: string;
  onChange?: () => void;
}

const TextInput = ({ label, name, ...inputProps }: ITextInput) => {
  return (
    <Wrapper>
      <NesTextInput id={name} name={name} label={label} {...inputProps} />
    </Wrapper>
  );
};

export default TextInput;
