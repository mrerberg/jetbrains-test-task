import { Icon } from "../icon";
import styles from "./index.module.css";
import cn from "classnames";
import { DEFAULT_ITEM_PADDING } from "../../../constants";

type Props = {
  id: string;
  active: boolean;
  level: number;
  open: boolean;
  hasInnerPages: boolean;
  url?: string;
  children: React.ReactNode;
  onClick?: (id: string) => void;
};

const calcItemStyles = (level: number) => {
  return { paddingLeft: DEFAULT_ITEM_PADDING + DEFAULT_ITEM_PADDING * level };
};

export const Content: React.FC<Props> = ({
  id,
  children,
  active,
  level,
  open,
  hasInnerPages,
  url,
  onClick,
}) => {
  const handleClick = (evt: React.MouseEvent<HTMLElement>) => {
    evt.preventDefault();

    onClick?.(id);

    // if (hasInnerPages) {
    //   onClick?.(level);
    // }

    // TODO: visit href
  };

  return (
    <a
      href={url}
      style={calcItemStyles(level)}
      className={cn(styles.content, {
        [styles.inner]: level > 0,
        [styles.active]: active,
      })}
      tabIndex={0}
      onClick={handleClick}
    >
      {hasInnerPages && (
        <Icon
          className={cn(styles.icon, {
            [styles.open]: open,
          })}
        />
      )}
      <span>{children}</span>
    </a>
  );
};
