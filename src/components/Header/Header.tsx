import Logo from "../../assets/Logo.svg";
import { useApp } from "../../hooks/useApp";
import Icon from "../Icon/Icon";
import styles from "./Header.module.css";

export default function Header() {
  const { dispatch } = useApp();
  return (
    <header className={styles.header}>
      <button
        className={styles.menuIconWrapper}
        onClick={() => {
          dispatch({ type: "toggleMenu" });
          dispatch({ type: "toggleOverlay" });
        }}
      >
        <Icon name="MENU" />
      </button>
      <img src={Logo} alt="" width="60px" />
    </header>
  );
}
