import { useEffect } from "react";
import EditorWithPreview from "./components/EditorWithPreview";
import Header from "./components/Header";
import "./styles.css";
import { useStoreActions, useStoreState } from "easy-peasy";
import registerProviders from "./utils/registerProviders";
import { GlobalContext } from "./context/GlobalContext";

registerProviders();

export default function App() {
  const initialiseEditor = useStoreActions<GlobalContext>(
    (actions) => actions.initialiseEditor
  );
  const iframe = useStoreState<GlobalContext>((state) => state.iframe);
  const hookConsole = useStoreActions<GlobalContext>(
    (actions) => actions.hookConsole
  );

  useEffect(() => {
    initialiseEditor();
    if (!iframe) return;
    return hookConsole(iframe);
  }, [iframe]);

  return (
    <main>
      <Header />
      <EditorWithPreview />
    </main>
  );
}
