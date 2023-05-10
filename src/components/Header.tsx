import React from "react";
import "./Header.module.css";
import logo from "../assets/p5-monaco.png";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <img src={logo} className={styles.logo} />
      <h1>p5.js Editor</h1>
    </header>
  );
}
