import { useState } from "react";
import styles from "./index.module.css";
import cn from "classnames";
import AnimateHeight from "react-animate-height";
import { Content } from "./content";
import React from "react";
import { DomainPage } from "../../../../types";

import { isSectionActive } from "./utils/is-active-section";
import { isActiveBacklight } from "./utils/is-active-backlight";
import { useTOCContext } from "../../context/context";

type Props = {
  id: string;
  title: string;
  parentId?: string;
  subPages?: Record<string, DomainPage>;
  tabIndex: number;
  url?: string;
  level: number;
  onClick?: (level: number, tab: string) => void;
};

export const TableOfContentItem: React.FC<Props> = ({
  id,
  parentId,
  title,
  level,
  subPages = {},
  url,
  onClick,
}) => {
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState<"auto" | number>(0);

  const { activeSection, setActiveSection, resetActiveSection } =
    useTOCContext();

  const keys = Object.keys(subPages);
  const hasInnerPages = keys.length > 0;

  const handleClick = (id: string) => {
    onClick?.(level, id);

    if (open) {
      resetActiveSection();
    } else {
      console.log("-->", { level, sectionId: id });
      setActiveSection({ level, sectionId: id });
    }

    if (hasInnerPages) {
      setOpen((prevVisible) => !prevVisible);
      setHeight((prevHeight) => (prevHeight === "auto" ? 0 : "auto"));
    }
  };

  return (
    <div
      className={cn(styles.container, {
        [styles.rootCategory]: level === 0,
        [styles.open]: open,
        [styles.backlight]: isActiveBacklight(
          id,
          level,
          activeSection,
          subPages,
          hasInnerPages
        ),
      })}
      data-test-id={`toc-category-${level}`}
    >
      <Content
        id={id}
        active={isSectionActive(id, level, activeSection)}
        url={url}
        hasInnerPages={hasInnerPages}
        level={level}
        open={open}
        onClick={handleClick}
      >
        {title}
      </Content>

      <AnimateHeight duration={500} height={height}>
        <div>
          {keys.map((key) => {
            const item = subPages[key];

            return (
              <TableOfContentItem
                id={item.id}
                parentId={parentId}
                key={item.title}
                url={item.url}
                tabIndex={item.tabIndex}
                level={item.level}
                title={item.title}
                subPages={item.subPages}
                onClick={() => {
                  onClick?.(item.level, item.id);
                }}
              />
            );
          })}
        </div>
      </AnimateHeight>
    </div>
  );
};
