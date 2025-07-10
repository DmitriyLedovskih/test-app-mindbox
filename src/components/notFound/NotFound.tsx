import type { INotFound } from "./NotFound.interface";
import styles from "./NotFound.module.css";

const NotFound = ({ text }: INotFound) => {
  return <div className={styles.block}>{text}</div>;
};

export default NotFound;
