import Icon, { IconType } from "../Icon/Icon";
import styles from "./Sidebar.module.css";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useApp } from "../../hooks/useApp";

const MENU_ITEMS: Item[] = [
  { id: 1, title: "Home", url: "/", icon: "HOME" },
  { id: 3, title: "Categories", url: "/category", icon: "OPTIONS" },
  { id: 4, title: "ADD", url: "/add", icon: "PLUS" },
];

export default function Sidebar() {
  const { state, dispatch } = useApp();
  const history = useHistory();
  const location = useLocation();
  const { pathname: currentPath } = location;

  const handleLink = (url: string) => {
    history.push(url);
    dispatch({ type: "toggleMenu" });
    dispatch({ type: "closeOverlay" });
  };

  return (
    <nav
      className={clsx(styles.navbar, {
        [styles.navbarOpen]: state.isVisibleMenu,
      })}
    >
      <div className={styles.itemsContainer}>
        {MENU_ITEMS.map((menuItem) => {
          return (
            <RowItem
              item={menuItem}
              key={menuItem.id}
              active={menuItem.url === currentPath}
              onClick={() => handleLink(menuItem.url)}
            />
          );
        })}
      </div>
    </nav>
  );
}

type Item = {
  id: number;
  url: string;
  icon: IconType;
  title: string;
};
interface ItemProps {
  item: Item;
  onClick: () => void;
  active: boolean;
}
function RowItem({ item, onClick, active }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.item, { [styles.itemActive]: active })}
      title="test"
    >
      <span className={styles.iconContainer}>
        <Icon name={item.icon} />
      </span>
    </button>
  );
}
