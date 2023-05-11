import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BubbleButton, JavisPopoverContaner, JavisDialogContaner } from "./App";
import { Command } from "@src/types";

let commands: Command[] = [];
chrome.storage.local.get("commands").then((result) => {
  commands = result.commands;
});
console.log("commands", commands);
let selected = false;
let prevSelectionStr = "";
let selectionTimeout: NodeJS.Timeout | null = null;

document.addEventListener("selectionchange", (event) => {
  const selection = window.getSelection();
  const curSelectionStr = selection?.toString();
  if (selected && (selection?.type === "Caret" || selection?.type === "None")) {
    handleUserUnselect();
    selected = false;
    return;
  }

  if (curSelectionStr !== prevSelectionStr) {
    prevSelectionStr = curSelectionStr ?? "";
    if (selectionTimeout) {
      window.clearTimeout(selectionTimeout);
    }
    selectionTimeout = setTimeout(() => {
      if (selection && prevSelectionStr.length > 0) {
        selected = true;
        handleUserSelection(selection);
      }
      prevSelectionStr = "";
      selectionTimeout = null;
    }, 300);
  }
});

const handleUserSelection = (selection: Selection) => {
  // render UI
  const selectionText = selection?.toString();

  if (selection && !selection?.isCollapsed && selectionText) {
    // render button
    const rootContainer = document.querySelector("#javis-extension-container");
    if (!rootContainer) throw new Error("Can't find Button root element");
    const root = createRoot(rootContainer);
    // calculate location
    const anchorOffset = selection.anchorOffset;
    const focusOffset = selection.focusOffset;
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const top =
      anchorOffset <= focusOffset
        ? rect.bottom + 8 + window.pageYOffset
        : rect.top + window.pageYOffset - 48;
    const left = rect.left;

    const handleButtonClick = () => {
      root.render(
        <StrictMode>
          <JavisPopoverContaner
            commands={commands}
            selection={selectionText}
            location={{ top, left }}
          />
        </StrictMode>
      );
    };

    root.render(
      <StrictMode>
        <BubbleButton onClick={handleButtonClick} left={left} top={top} />
      </StrictMode>
    );
  }
};

const handleUserUnselect = () => {
  const rootContainer = document.querySelector("#javis-container");
  if (rootContainer) {
    if (rootContainer.remove) {
      rootContainer.remove();
    } else {
      rootContainer.innerHTML = "";
    }
  }
};

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.type === "SHOW_MODAL") {
    const { message } = request;
    const rootContainer = document.querySelector("#javis-extension-container");
    if (!rootContainer) throw new Error("Can't find Button root element");
    const root = createRoot(rootContainer);
    root.render(
      <StrictMode>
        <JavisDialogContaner commands={commands} selectionText={message} />
      </StrictMode>
    );
  }
});
