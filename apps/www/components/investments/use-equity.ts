import { atom, useAtom } from "jotai";

type isEquityConfig = boolean;

export const isEquityAtom = atom<isEquityConfig>(false);

export const useIsEquity = () => {
  return useAtom(isEquityAtom);
};
