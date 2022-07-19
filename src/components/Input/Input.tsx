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
  @media screen and (max-width: 870px) {
    width: 100%;
  }
`;

type InputProps = {
  onChange: (e: any) => void;
  onKeyDown: (e: any) => void;
};

const Input: React.FC<InputProps> = ({ onKeyDown, onChange }) => {
  return (
    <input
      type="text"
      css={InputStyle}
      placeholder="Searching..."
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;
