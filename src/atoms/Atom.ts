import { atom, WritableAtom } from 'jotai';

export const searchValueAtom = atom<string>('');
export const selectorValueAtom = atom<string>('POPULARITY_DESC');

export function updateSearchValue(
  initialValue?: string
): WritableAtom<string, string | undefined> {
  const searchValue = atom(initialValue, (get, set, nextValue?: string) => {
    const update = nextValue ?? get(searchValueAtom);
    set(searchValue, update);
  });

  return searchValue as WritableAtom<string, string | undefined>;
}

export function updateSelectorValue(
  initialValue?: string
): WritableAtom<string, string | undefined> {
  const selectorValue = atom(initialValue, (get, set, nextValue?: string) => {
    const update = nextValue ?? get(selectorValueAtom);
    set(selectorValue, update);
  });

  return selectorValue as WritableAtom<string, string | undefined>;
}

export const NavListValue = atom<string>('All');
