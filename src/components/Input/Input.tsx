import React, { useState } from 'react';
import { css } from '@emotion/react';
import { useMutation } from '@apollo/client';

const InputStyle = css`
  width: 500px;
  height: 30px;
  outline: none;
  border: 1px solid #8e8e8e;
  border-radius: 50px;
  padding: 1rem;

  &:focus::placeholder {
    color: transparent;
  }

  @media screen and (max-width: 870px) {
    width: 100%;
  }
`;

type InputProps = {
  onChange: (e: any) => void;
  value: string;
};

const Input: React.FC<InputProps> = ({ onChange, value }) => {
  return (
    <input
      type="text"
      css={InputStyle}
      placeholder="Searching ..."
      onChange={onChange}
      value={value}
    />
  );
};

export default Input;
