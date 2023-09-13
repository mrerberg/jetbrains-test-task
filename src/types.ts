export interface Data {
  entities: Entities;
  topLevelIds: string[];
}

export interface Entities {
  pages: { [key: string]: Page };
}

export interface Page {
  /**
   * unique element identification number
   */
  id: string;

  /**
   * page title, used as a text for TOC link
   */
  title: string;

  /**
   * relative path to a page, href for a link
   */
  url?: string;

  /**
   * parent id pointer used to determine where to nest the element
   */
  parentId: string;

  /**
   * element nesting level in regards to the root. level determines inner margin in the node
   */
  level: number;

  tabIndex: number;

  /**
   *  list of nested pages ids
   */
  pages?: string[];
}

export interface DomainPage {
  id: string;
  title: string;
  url?: string;
  parentId: string;
  level: number;
  tabIndex: number;
  subPages?: Record<string, DomainPage>;
}
