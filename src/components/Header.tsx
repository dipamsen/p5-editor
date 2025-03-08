import "./Header.module.css";
import logo from "../assets/p5-monaco.svg";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <img src={logo} className={styles.logo} />
      <h1>p5.js Editor</h1>
      <span style={{ alignSelf: "flex-end", color: "grey" }}>
        (<kbd>^</kbd> + <kbd>Enter</kbd> to run your code; <kbd>^</kbd> +{" "}
        <kbd>K</kbd> for all commands)
      </span>
    </header>
  );
}
