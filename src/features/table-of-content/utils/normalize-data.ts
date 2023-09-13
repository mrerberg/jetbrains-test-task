import { Data, DomainPage } from "../../../types";

export function normalizeData(data: Data, parentId = "ij", level = 0) {
  const map: Record<string, DomainPage> = {};

  for (const key in data.entities.pages) {
    const page = data.entities.pages[key];

    if (page.parentId === parentId && page.level === level) {
      map[key] = {
        id: page.id,
        title: page.title,
        url: page.url,
        parentId: page.parentId,
        level: page.level,
        tabIndex: page.tabIndex,
      };

      if (page.pages && page.pages.length > 0) {
        map[key].subPages = normalizeData(data, key, level + 1);
      }
    }
  }

  return map;
}
