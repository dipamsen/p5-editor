import { editor } from "monaco-editor";
import { CommandsRegistry } from "monaco-editor/esm/vs/platform/commands/common/commands";
import * as monacoActions from "monaco-editor/esm/vs/platform/actions/common/actions";

export const removeContextMenuGroup = (groupName: string) => {
  let menus = monacoActions.MenuRegistry._menuItems as Map<any, any>;
  const contextMenuEntry = Array.from(menus, ([key, value]) => ({
    key,
    value,
  })).find((entry) => entry.key.id == "EditorContext");

  let removeById = (list) => {
    let node = list._first;
    do {
      const cmd = node.element?.command;
      let shouldRemove = node.element?.group === groupName;
      if (shouldRemove) {
        list._remove(node);
      }
    } while ((node = node.next));
  };
  removeById(contextMenuEntry.value);
};
