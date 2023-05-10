import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./Header.module.css";
import logo from "../assets/p5-monaco.png";
import styles from "./Header.module.css";
export default function Header() {
    return (_jsxs("header", { children: [_jsx("img", { src: logo, className: styles.logo }), _jsx("h1", { children: "p5.js Editor" })] }));
}
