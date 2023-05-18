import { useEffect, useRef } from "react";
import styles from "./Preview.module.css";
import { useStoreActions } from "easy-peasy";
import { GlobalContext } from "../context/GlobalContext";

export default function Preview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const setIframe = useStoreActions<GlobalContext>(
    (actions) => actions.setIframe
  );

  useEffect(() => {
    if (!iframeRef.current) return;
    setIframe(iframeRef.current);
  }, [iframeRef]);

  return (
    <>
      <div>Preview</div>
      <iframe ref={iframeRef} className={styles.iframe} />
    </>
  );
}
