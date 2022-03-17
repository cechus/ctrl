import clsx from "clsx";
import { useEffect, useState } from "react";
import { ctrlService } from "../../service";
import { formatSeconds, formatTime } from "../../utils";
import CtrlCard from "../CtrlCard/CtrlCard";
import Icon from "../Icon/Icon";
import styles from "./Home.module.css";

export default function Home() {
  const [ctrls, setCtrls] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCtrl();
  }, []);
  const getCtrl = async () => {
    setLoading(true);
    const { data } = await ctrlService.getCtrl();
    // return new Promise((resolve, reject) => {
    // resolve(
    //   ;
    // });
    setCtrls(data);
    setLoading(false);
  };

  return (
    <>
      <h1 className={styles.title}>Current Tasks</h1>
      <div className={styles.itemsContainer}>
        {loading && <div className={styles.backdrop}>LOADING</div>}
        {ctrls.map((ctrl: any) => {
          return (
            <CtrlCard key={ctrl.ctrl_id} item={ctrl} onRefreshCtrl={getCtrl} />
          );
        })}
      </div>
    </>
  );
}
