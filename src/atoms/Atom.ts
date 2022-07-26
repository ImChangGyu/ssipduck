import { atom, WritableAtom } from 'jotai';

export const searchValueAtom = atom('');

export function updateSearchValue(
  initialValue?: string
): WritableAtom<string, string | undefined> {
  const anAtom = atom(initialValue, (get, set, nextValue?: string) => {
    const update = nextValue ?? get(searchValueAtom);
    set(anAtom, update);
  });

  return anAtom as WritableAtom<string, string | undefined>;
}
