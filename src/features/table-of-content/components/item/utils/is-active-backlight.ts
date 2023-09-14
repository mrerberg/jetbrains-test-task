import { DomainPage } from "../../../../../types";
import { ActiveSection } from "../../../context/context";

export const isActiveBacklight = (
  id: string,
  level: number,
  activeSection: ActiveSection,
  subPages: Record<string, DomainPage>,
  hasInnerPages: boolean
) => {
  if (!hasInnerPages || level <= 0) {
    return false;
  }

  const subPage = subPages[activeSection.sectionId];
  const subPageWithoutInnerPages =
    Object.keys(subPage.subPages || {}).length === 0;

  if (subPage && subPageWithoutInnerPages) {
    return true;
  }

  return id === activeSection.sectionId && level === activeSection.level;
};
