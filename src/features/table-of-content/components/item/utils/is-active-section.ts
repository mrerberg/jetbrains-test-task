import { ActiveSection } from "../../../context/context";

export const isSectionActive = (
  id: string,
  level: number,
  activeSection: ActiveSection | undefined
) => {
  if (!activeSection) return false;

  return id === activeSection.sectionId && level === activeSection.level;
};
