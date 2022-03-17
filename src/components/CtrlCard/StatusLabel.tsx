import clsx from "clsx";
import styles from "./StatusLabel.module.css";

export default function StatusLabel({ status }: any) {
  return (
    <div
      className={clsx(styles.status, {
        [styles.statusPause]: ["paused", "pause"].includes(status),
        [styles.statusStart]: ["started", "start"].includes(status),
        [styles.statusStop]: ["stopped", "stop"].includes(status),
      })}
    >
      {status}
    </div>
  );
}
