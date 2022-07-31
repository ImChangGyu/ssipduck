import React, { useState } from 'react';
import { Input, Selector } from 'components';
import { css } from '@emotion/react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import * as I from 'assets';
import { searchValueAtom, updateSearchValue } from 'atoms/Atom';

const Positioner = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5rem 3rem;
  position: relative;
  flex-direction: column;
  svg {
    margin-bottom: 5rem;
  }
`;

const SelectorWrapper = css`
  position: absolute;
  top: 98%;
  left: 89.5%;
  @media screen and (max-width: 1630px) {
    left: 86.3%;
  }
  @media screen and (max-width: 1240px) {
    left: 80%;
  }
  @media screen and (max-width: 870px) {
    position: relative;
    top: 0;
    left: 0;
    margin-top: 5rem;
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
      <div css={SelectorWrapper}>
        <Selector />
      </div>
    </header>
  );
};

export default InputContainer;
