import { DomainPage } from "../../../../../types";
import { hasInnerPages } from "./has-inner-pages";
import { ActiveSection } from "../../../context/context";

export const isActiveBacklight = (
  id: string,
  level: number,
  activeSection: ActiveSection,
  subPages: Record<string, DomainPage>,
  withInnerPages: boolean
) => {
  if (!withInnerPages || level <= 0) {
    return false;
  }

  const subPage = subPages[activeSection.sectionId];
  const subPageWithoutInnerPages = !hasInnerPages(subPage?.subPages || {});

  if (subPage && subPageWithoutInnerPages) {
    return true;
  }

  return id === activeSection.sectionId && level === activeSection.level;
};
