import { Skeleton } from "../item/skeleton";

import styles from "./index.module.css";

export const TableOfContentSkeleton = () => {
  return (
    <div className={styles.list} data-test-id="toc-list-skeleton">
      <div className={styles.listItem}>
        <Skeleton />

        <div className={styles.subList}>
          <Skeleton />
          <Skeleton />
          <Skeleton />

          <div className={styles.subList}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>

      <div className={styles.listItem}>
        <Skeleton />

        <div className={styles.subList}>
          <Skeleton />
          <Skeleton />
          <Skeleton />

          <div className={styles.subList}>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </div>
  );
};
