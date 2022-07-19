import React, { useState } from 'react';
import { Input } from '../../components';
import { css } from '@emotion/react';
import { useMutation } from '@apollo/client';
import GET_ANI from '../../queries/getAni.queries';

const Positioner = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7rem;
`;

const InputContainer = () => {
  const [searchValue, setSearchValue] = useState<String>();

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setSearchValue('');
    }
  };
  return (
    <div css={Positioner}>
      <Input
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default InputContainer;
