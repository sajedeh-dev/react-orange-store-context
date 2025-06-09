import { RingLoader } from "react-spinners";
import styles from "./Loader.module.css"

function Loader() {
  return (
    <div className={styles.loader}>
      <RingLoader  stroke="3" color="#fe5d42" size={60} />
    </div>
  );
}

export default Loader;
