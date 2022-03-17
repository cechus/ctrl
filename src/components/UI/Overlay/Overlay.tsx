import styles from "./Overlay.module.css";
import { useApp } from "../../../hooks/useApp";
import clsx from "clsx";

export default function Overlay() {
  const { state, dispatch } = useApp();
  const handleClick = () => {
    dispatch({ type: "toggleMenu" });
    dispatch({ type: "closeOverlay" });
  };
  return (
    <div
      className={clsx(styles.overlay, {
        [styles.overlayVisible]: state.isVisibleOverlay,
      })}
      onClick={handleClick}
    ></div>
  );
}
