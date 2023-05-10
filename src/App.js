import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import EditorWithPreview from "./components/EditorWithPreview";
import Header from "./components/Header";
import "./styles.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import registerProviders from "./utils/registerProviders";
registerProviders();
export default function App() {
    const initialiseEditor = useStoreActions((actions) => actions.initialiseEditor);
    const iframe = useStoreState((state) => state.iframe);
    const createConsoleLog = useStoreActions((actions) => actions.createConsoleLog);
    useEffect(() => {
        initialiseEditor();
        if (!iframe)
            return;
        const listener = (ev) => {
            if (ev.source == iframe?.contentWindow) {
                const log = {
                    data: ev.data,
                    id: Date.now().toString(),
                    method: "log",
                };
                createConsoleLog(log);
            }
        };
        window.addEventListener("message", listener);
        return () => {
            window.removeEventListener("message", listener);
        };
    }, [iframe]);
    return (_jsxs("main", { children: [_jsx(Header, {}), _jsx(EditorWithPreview, {})] }));
}
