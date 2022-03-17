import clsx from "clsx";
import { ctrlService } from "../../service";
import { formatSeconds, formatTime } from "../../utils";
import Icon from "../Icon/Icon";
import Footer from "./Footer";
import styles from "./CtrlCard.module.css";
import StatusLabel from "./StatusLabel";
import { useState } from "react";

export type Ctrl = {
  ctrl_id: number;
  category_id: number;
  created_at: string;
  deleted_at: string | null;
  description: string;
  diff: number;
  duration: number | null;
  end_time: string | null;
  start_time: string;
  status: string; // !! TODO
  title: string;
  updated_at: string;
};

interface CtrlCardProps {
  item: Ctrl;
  onRefreshCtrl: () => void;
}
export default function CtrlCard({ item, onRefreshCtrl }: CtrlCardProps) {
  const [loading, setLoading] = useState(false);
  const onCheckIn = async (
    action: "start" | "pause" | "stop",
    ctrlId: number
  ) => {
    setLoading(true);
    await ctrlService.checkIn({
      ctrlId,
      action,
    });
    onRefreshCtrl();
    setLoading(false);
    // .then(() => {
    // });
  };
  return (
    <div>
      <div
        className={clsx(styles.itemContainer, {
          [styles.itemContainerPaused]: item.status === "paused",
        })}
      >
        {loading && <div className={styles.backdrop}>LOADING</div>}
        <div className={styles.item}>
          <div className={styles.itemCategory}>{item.category_id}</div>
          <div>
            <p className={styles.itemTitle}>{item.title}</p>
            <StatusLabel status={item.status} />
            <Status
              item={item}
              onclick={(action: "start" | "pause" | "stop") =>
                onCheckIn(action, item.ctrl_id)
              }
            />
          </div>
          <div className={styles.diffContainer}>
            <span className={styles.hour}>
              {formatSeconds(item.diff).hours}h
            </span>
            <span className={styles.minute}>
              {formatSeconds(item.diff).minutes}m
            </span>
          </div>

          <div className={styles.itemTime}>
            <span className={styles.timeStart}>
              {formatTime(item.start_time)}
            </span>
            <div className={styles.lineContainer}></div>
            {item.end_time ? (
              <span className={styles.timeEnd}>
                {formatTime(item.end_time)}
              </span>
            ) : (
              <span className={styles.circle}></span>
            )}
          </div>
        </div>
        <Footer item={item} />
      </div>
    </div>
  );
}

function Status({ item, onclick }: any) {
  let html: React.ReactNode;
  if (item.status === "started") {
    html = (
      <div className={styles.buttons}>
        <button
          className={styles.iconContainer}
          onClick={() => onclick("pause")}
        >
          <Icon name="PAUSE" />
        </button>
        <button
          className={styles.iconContainer}
          onClick={() => onclick("stop")}
        >
          <Icon name="STOP" />
        </button>
      </div>
    );
  }
  if (item.status === "paused") {
    html = (
      <div className={styles.buttons}>
        <button
          className={styles.iconContainer}
          onClick={() => onclick("start")}
        >
          <Icon name="PLAY" />
        </button>
        <button
          className={styles.iconContainer}
          onClick={() => onclick("stop")}
        >
          <Icon name="STOP" />
        </button>
      </div>
    );
  }

  return <>{html}</>;
}
