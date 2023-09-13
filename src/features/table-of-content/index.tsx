import styles from "./index.module.css";
import { TableOfContentItem } from "./components/item";
import { useGetPages } from "./api/use-get-pages";

import { TableOfContentSkeleton } from "./components/skeleton";
import { sortItemsByTabIndex } from "./utils/sort-items-by-tab-index";

import { ContextProvider } from "./context/context";

export const TableOfContent = () => {
  const { pages, loading, error } = useGetPages();

  if (loading) {
    return (
      <aside className={styles.container}>
        <TableOfContentSkeleton />
      </aside>
    );
  }

  if (error) {
    return (
      <aside className={styles.container}>
        <div data-test-id="toc-list-error">Some error occurred :c</div>
      </aside>
    );
  }

  const entries = sortItemsByTabIndex(pages);

  if (!entries.length) {
    return (
      <aside className={styles.container}>
        <div data-test-id="toc-list-empty">No pages to show c:</div>
      </aside>
    );
  }

  return (
    <aside className={styles.container} data-test-id="toc-list">
      <ContextProvider>
        {entries.map(([key, item]) => {
          return (
            <TableOfContentItem
              id={item.id}
              parentId={item.id}
              key={key}
              level={item.level}
              tabIndex={item.tabIndex}
              title={item.title}
              subPages={item.subPages}
              url={item.url}
            />
          );
        })}
      </ContextProvider>
    </aside>
  );
};
