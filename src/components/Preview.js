import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import styles from "./Preview.module.css";
import { useStoreActions } from "easy-peasy";
export default function Preview() {
    const iframeRef = useRef(null);
    const setIframe = useStoreActions((actions) => actions.setIframe);
    useEffect(() => {
        if (!iframeRef.current)
            return;
        setIframe(iframeRef.current);
    }, [iframeRef]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: "Preview" }), _jsx("iframe", { ref: iframeRef, className: styles.iframe })] }));
}
