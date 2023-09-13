import { ActiveSection } from "../../../context/context";

export const isActiveBacklight = (
  id: string,
  level: number,
  activeSection: ActiveSection
) => {
  if (level <= 0) {
    return false;
  }

  return id === activeSection.sectionId && level === activeSection.level;
};
