import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import styles from "./Editor.module.css";
import { useStoreActions, useStoreState } from "easy-peasy";
export const Editor = ({ files }) => {
    const editor = useStoreState((state) => state.editor);
    const createEditor = useStoreActions((actions) => actions.createEditor);
    const initEditor = useStoreActions((actions) => actions.createEditorActions);
    const ref = useRef(null);
    useEffect(() => {
        if (!ref.current)
            return;
        setTimeout(() => {
            createEditor(ref.current);
        }, 100);
        return () => {
            if (editor)
                editor.dispose();
        };
    }, [ref]);
    useEffect(() => {
        if (!editor)
            return;
        initEditor(editor);
    }, [editor]);
    return _jsx("div", { className: styles.Editor, id: "editor", ref: ref });
};
