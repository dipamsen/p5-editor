import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Editor } from "./Editor";
import Preview from "./Preview";
import styles from "./EditorWithPreview.module.css";
import { useEffect, useState } from "react";
import { useStoreState } from "easy-peasy";
import { Console } from "console-feed";
export default function EditorWithPreview() {
    const files = useStoreState((state) => state.files);
    const editor = useStoreState((state) => state.editor);
    const [selectedFile, setSelectedFile] = useState(files[0]);
    const logs = useStoreState((state) => state.consoleLogs);
    useEffect(() => {
        setSelectedFile(files[0]);
    }, [files]);
    useEffect(() => {
        if (selectedFile) {
            editor?.setModel(selectedFile.model);
        }
    }, [selectedFile]);
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: styles.editorContainer, children: [_jsx("div", { className: styles.tabs, children: files.map((f) => (_jsx("div", { className: [
                                styles.tab,
                                selectedFile?.model.uri.path == f.model.uri.path
                                    ? styles.active
                                    : styles.inactive,
                            ].join(" "), onClick: () => {
                                setSelectedFile(f);
                            }, children: f.name }, f.model.uri.path))) }), _jsx(Editor, { files: files }), _jsxs("div", { className: styles.consoleContainer, children: [_jsx("p", { className: styles.consoleHeader, children: "Console" }), _jsx("div", { className: styles.scrollable, children: _jsx(Console, { variant: "dark", logs: logs, styles: {
                                        BASE_FONT_SIZE: "16px",
                                    } }) })] })] }), _jsx("div", { className: styles.previewContainer, children: _jsx(Preview, {}) })] }));
}
