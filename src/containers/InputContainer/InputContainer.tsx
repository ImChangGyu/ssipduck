import React, { useState } from 'react';
import { Input } from '../../components';
import { css } from '@emotion/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as I from '../../assets';
import { searchValueAtom, updateSearchValue } from '../../atoms/Atom';

const Positioner = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5rem 3rem;
  flex-direction: column;
  svg {
    margin-bottom: 5rem;
  }
`;

const InputContainer = () => {
  const [value, updateValue] = useAtom(searchValueAtom);

  return (
    <header css={Positioner}>
      <I.ssipduck />
      <Input
        onChange={(e) => {
          updateValue(e.target.value);
        }}
        value={value}
      />
    </header>
  );
};

export default InputContainer;
