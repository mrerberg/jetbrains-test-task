import { DomainPage } from "../../../types";

export const sortItemsByTabIndex = (pages: Record<string, DomainPage>) => {
  return Object.entries(pages).sort((a, b) => {
    return a[1].tabIndex - b[1].tabIndex;
  });
};
