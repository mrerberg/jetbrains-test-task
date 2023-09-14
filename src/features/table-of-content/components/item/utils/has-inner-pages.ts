import { DomainPage } from "../../../../../types";

export const hasInnerPages = (subPages: Record<string, DomainPage>) => {
  const keys = Object.keys(subPages);
  return keys.length > 0;
};
