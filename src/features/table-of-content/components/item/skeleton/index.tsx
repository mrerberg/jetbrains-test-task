import styles from "./index.module.css";

import cn from "classnames";

type Props = {
  className?: string;
};

export const Skeleton: React.FC<Props> = ({ className }) => {
  return <div className={cn(styles.skeleton, className)} />;
};
