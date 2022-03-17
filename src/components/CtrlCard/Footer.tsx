import { useEffect, useState } from "react";
import { ctrlService } from "../../service";
import Icon from "../Icon/Icon";
import { Ctrl } from "./CtrlCard";
import styles from "./Footer.module.css";
import { useSpring, config, animated } from "react-spring";
import { useHeight } from "../../hooks/useHeight";
import { formatOnlyDate, formatTime } from "../../utils";
import StatusLabel from "./StatusLabel";

interface FooterProps {
  item: Ctrl;
}

export type Record = {
  record_id: number;
  action: string; // TODO
  created_at: string;
  ctrl_id: number;
  deleted_at: string | null;
  duration: number | null;
  end_time: string | null;
  start_time: string | null;
  updated_at: string | null;
};

export default function Footer({ item }: FooterProps) {
  const [records, setRecords] = useState<Record[]>([]);
  const [showRecords, setShowRecords] = useState(false);
  const [loading, setLoading] = useState(false);
  const getRecords = async () => {
    setLoading(true);
    try {
      const response = await ctrlService.getRecords({
        filter: { ctrlId: item.ctrl_id },
      });
      setRecords(response.data);
    } catch (e) {
      console.log(`e`, e);
    } finally {
      setLoading(false);
    }
  };
  const toggleShowRecords = () => {
    setShowRecords(!showRecords);
  };
  useEffect(() => {
    if (showRecords) {
      getRecords();
    }
  }, [showRecords]);

  const [heightRef, height] = useHeight();
  const slideInStyles = useSpring({
    config: { ...config.stiff },
    from: { opacity: 0, height: 0 },
    to: {
      opacity: showRecords ? 1 : 0,
      height: showRecords ? height : 0,
    },
  });

  const spin = useSpring({
    config: { friction: 30 },
    transform: showRecords ? "rotate(180deg)" : "rotate(0deg)",
  });
  return (
    <div className={styles.itemFooter}>
      <button className={styles.button} onClick={toggleShowRecords}>
        <animated.div
          // className={styles.button}
          // onClick={toggleShowRecords}
          style={spin}
        >
          <Icon name="ARROW_DOWN" />
        </animated.div>
      </button>
      {loading && <p>Loading </p>}
      <animated.div style={{ ...slideInStyles, overflow: "hidden" }}>
        {!loading && <h1 className={styles.title}>{records.length} records</h1>}

        <div ref={heightRef} className={styles.recordsContainer}>
          {records.map((record) => {
            return (
              <div className={styles.recordItem}>
                <span className={styles.time}>
                  {formatTime(record.start_time)}
                </span>
                <p className={styles.date}>
                  {formatOnlyDate(record.start_time)}
                </p>
                <div className={styles.action}>
                  <StatusLabel status={record.action} />
                </div>
              </div>
            );
          })}
        </div>
      </animated.div>
    </div>
  );
}
