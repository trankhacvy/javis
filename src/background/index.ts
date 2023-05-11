import { Javis } from "./api";
import { commandList } from "./commands";
import { v4 } from "uuid";

chrome.runtime.onInstalled.addListener(() => {
  // init commands
  initCommands();
  // chrome.contextMenus.create({
  //   title: "Call ChatGPT",
  //   contexts: ["selection"],
  //   id: "chatGptMenuId",
  // });

  // if (chrome.runtime.openOptionsPage) {
  //   chrome.runtime.openOptionsPage();
  // } else {
  //   window.open(chrome.runtime.getURL("src/options/index.html"));
  // }
});

let javis: Javis;

chrome.tabs.onUpdated.addListener(async function (tabId: number, info) {
  if (info.status === "complete") {
    const result = await chrome.storage.local.get(["openAIKey"]);
    if (result) {
      javis = new Javis(result.openAIKey);
    }
    chrome.tabs.sendMessage(tabId, {
      type: "TAB_UPDATED",
    });
  }
});

const initCommands = async () => {
  chrome.storage.local
    .set({
      commands: commandList,
    })
    // TODO remove
    .then(() => {
      console.log("commands saved");
    });
};

chrome.commands.onCommand.addListener(async (command) => {
  console.log(`Command: ${command}`);
  const queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  if (tab && tab.id) {
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const selection = window.getSelection();
        const selectionText = selection?.toString();

        return selectionText;
      },
    });
    let selectionText = "";
    for (const { frameId, result } of injectionResults) {
      selectionText = result as string;
      break;
    }

    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_MODAL",
      message: selectionText,
    });
  }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "SEND_COMMAND") {
    handleSendCommand(request, sender);
  }
});

const handleSendCommand = async (
  request: any,
  sender: chrome.runtime.MessageSender
) => {
  if (!sender.tab?.id || !javis) return;

  try {
    const { command, values, selectionText, prompt } = request;
    const tabId = sender.tab?.id;
    const messageId = v4();
    console.log("handle request: ", request);

    let template;
    let templateValues: Record<string, string> = {};
    if (command) {
      if (values.length !== command.keys.length) {
        console.error("Invalid command");
      }
      template = command.template;
      command.keys.forEach((key: string, index: number) => {
        templateValues[key] = values[index];
      });
    } else {
      template = [prompt, selectionText].filter(Boolean).join(": ");
    }

    chrome.tabs.sendMessage(
      tabId,
      {
        type: "SEND_RESPONSE",
        message: "",
        messageId,
      },
      {
        frameId: 0,
      }
    );

    javis.process(template, templateValues, {
      onNewToken(token) {
        chrome.tabs.sendMessage(
          tabId,
          {
            type: "SEND_RESPONSE",
            message: token,
            messageId,
          },
          {
            frameId: 0,
          }
        );
      },
      onEnd() {
        chrome.tabs.sendMessage(tabId, {
          type: "SEND_RESPONSE",
          message: "",
          ended: true,
          messageId,
        });
      },
      onError(error) {
        chrome.tabs.sendMessage(tabId, {
          type: "SEND_RESPONSE",
          message: error?.message,
          hasError: true,
          messageId,
        });
      },
    });

    // setTimeout(() => {
    //   chrome.tabs.sendMessage(
    //     tabId,
    //     {
    //       type: "SEND_RESPONSE",
    //       message: `
    //       Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
    //       `,
    //       messageId,
    //     },
    //     {
    //       frameId: 0,
    //     }
    //   );

    //   chrome.tabs.sendMessage(tabId, {
    //     type: "SEND_RESPONSE",
    //     message: "",
    //     ended: true,
    //     messageId,
    //   });
    // }, 800);

    // processSimpleCommand(`${message} ${selection ?? ""}`, {
    //   onNewToken: (token) => {
    //     chrome.tabs.sendMessage(
    //       tabId,
    //       {
    //         type: "SEND_RESPONSE",
    //         message: token,
    //         messageId,
    //       },
    //       {
    //         frameId: 0,
    //       }
    //     );
    //   },
    //   onEnd: () => {
    //     chrome.tabs.sendMessage(tabId, {
    //       type: "SEND_RESPONSE",
    //       message: "",
    //       ended: true,
    //       messageId,
    //     });
    //   },
    //   onError: (error: any) => {
    //     chrome.tabs.sendMessage(tabId, {
    //       type: "SEND_RESPONSE",
    //       message: error?.message,
    //       hasError: true,
    //       messageId,
    //     });
    //   },
    // });
  } catch (error: any) {
    console.error(error);
    chrome.tabs.sendMessage(sender.tab.id, {
      type: "SEND_ERROR",
      message: error?.message ?? "Server error",
    });
  }
};

// chrome.browserAction.onClicked.addListener((tab) => {
//   console.log("action click : ", tab);
//   const tabId = tab?.id as number;

//   chrome.tabs.sendMessage(tabId, {
//     type: "SHOW_LOADING",
//   });

// });

// chrome.contextMenus.onClicked.addListener(async function (info, tab) {
//   if (info.menuItemId === "chatGptMenuId") {
//     const tabId = tab?.id as number;

//     await chrome.tabs.sendMessage(tabId, {
//       type: "SHOW_LOADING",
//     });

//     //AI process
//     const result = await processText(info.selectionText ?? "");

//     await chrome.tabs.sendMessage(tabId, {
//       type: "SHOW_RESULT",
//       message: result,
//     });
//   }
// });
