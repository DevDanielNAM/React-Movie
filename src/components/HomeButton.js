import { Link } from "react-router-dom";
import styles from "./HomeButton.module.css";

function HomeButton() {
  return (
    <Link to={"/"} className={styles.link}>
      <button className={styles.home}>HOME</button>
    </Link>
  );
}

export default HomeButton;
