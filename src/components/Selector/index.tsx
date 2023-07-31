import React, { useState } from 'react';
import { SelectorItem } from 'components';
import { css } from '@emotion/react';
import { selectorValueAtom } from 'atoms/Atom';
import { useAtom } from 'jotai';

const SelectorData = [
  { key: 'START_DATE_DESC', value: '최신순' },
  { key: 'POPULARITY_DESC', value: '인기순' },
  { key: 'TRENDING_DESC', value: '최신 인기순' },
];

const Container = css`
  position: relative;
  width: 100px;
`;

const Title = css`
  font-size: 16px;
  width: 100%;
  text-align: center;
  padding: 0.25rem;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ItemContainer = css`
  position: absolute;
  width: 100%;
  left: 0;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  z-index: 999;
`;

const Selector = () => {
  const [selectorState, setSelectorState] = useState<boolean>(false);
  const [selectorValue, updateSelectorValue] = useAtom(selectorValueAtom);
  return (
    <div css={Container}>
      <div css={Title} onClick={() => setSelectorState((prev) => !prev)}>
        {SelectorData.map((item) => item.key === selectorValue && item.value)}
      </div>
      {selectorState && (
        <ul css={ItemContainer}>
          {SelectorData.map((item, index) => (
            <SelectorItem
              key={index}
              onClick={() => {
                updateSelectorValue(item.key);
                setSelectorState((prev) => !prev);
              }}
            >
              {item.value}
            </SelectorItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Selector;
