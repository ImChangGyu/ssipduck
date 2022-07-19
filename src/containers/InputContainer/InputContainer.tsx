import React, { useState } from 'react';
import { Input } from '../../components';
import { css } from '@emotion/react';
import * as I from '../../assets';

const Positioner = css`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 5rem;
  flex-direction: column;
  svg {
    margin-bottom: 5rem;
  }
`;

const InputContainer = () => {
  const [searchValue, setSearchValue] = useState<String>();

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setSearchValue('');
    }
  };
  return (
    <header css={Positioner}>
      <I.ssipduck />
      <Input
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default InputContainer;
