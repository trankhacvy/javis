import { Actions, Command as CommandType } from "@src/types";
import { CommandMenu } from "./CommandMenu";
import { useRef, useState, useEffect } from "react";
import { ChatDialog } from "./ChatDialog";
import { useAppStore } from "../store";
import { Dialog, DialogContent } from "./Dialog";

type JavisDialogProps = {
  commands: { group: string; commands: CommandType[] }[];
  selectionText?: string;
};

export const JavisDialog = ({ commands, selectionText }: JavisDialogProps) => {
  const [showChat, setShowChat] = useState(false);

  const messages = useAppStore((state) => state.messages);
  const addMessage = useAppStore((state) => state.addMessage);
  const setChatTitle = useAppStore((state) => state.setChatTitle);
  const clearChat = useAppStore((state) => state.clearChat);

  return (
    <Dialog defaultOpen>
      <DialogContent className="!jv-w-[576px] jv-overflow-hidden !jv-p-0">
        {showChat || messages.length > 0 ? (
          <ChatView
            onBack={() => {
              chrome.runtime.sendMessage({
                type: Actions.ClearMemory,
              });
              setShowChat(false);
              clearChat();
            }}
          />
        ) : (
          <CommandMenu
            commands={commands}
            selectionText={selectionText}
            commandListClassName="!jv-max-h-[384px]"
            onEnter={(text: string) => {
              clearChat();
              setChatTitle(text ?? "");
              setShowChat(true);
              addMessage({
                type: "COMMAND",
                content: text,
              });
              chrome.runtime.sendMessage({
                type: "SEND_COMMAND",
                prompt: text,
                selectionText,
              });
            }}
            onCommand={(command, option) => {
              if (selectionText) {
                clearChat();
                setChatTitle(
                  [command.name, option?.text].filter(Boolean).join(": ") ?? ""
                );
                setShowChat(true);
                addMessage({
                  type: "COMMAND",
                  content: [command?.name, option?.text].join(" "),
                  selection: selectionText,
                });
                chrome.runtime.sendMessage({
                  type: "SEND_COMMAND",
                  selectionText,
                  command,
                  option,
                  values: [option?.prompt, selectionText].filter(Boolean),
                });
              }
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

type ChatViewProps = {
  onBack: VoidFunction;
};

const ChatView = ({ onBack }: ChatViewProps) => {
  const [question, setQuestion] = useState("");

  const messages = useAppStore((state) => state.messages);
  const chatTitle = useAppStore((state) => state.title);
  const addMessage = useAppStore((state) => state.addMessage);
  const updateMessage = useAppStore((state) => state.updateMessage);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addMessage({
      type: "COMMAND",
      content: question,
    });
    chrome.runtime.sendMessage({
      type: "SEND_COMMAND",
      message: question,
    });
    setQuestion("");
    setTimeout(() => {
      if (containerRef && containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
  };

  useEffect(() => {
    let tempMessage = "";
    chrome.runtime.onMessage.addListener(function (request, sender) {
      if (request.type === "SEND_RESPONSE") {
        const { messageId, message, ended, hasError } = request;
        if (messageId) {
          tempMessage = tempMessage + message;
          updateMessage(messageId, {
            content: tempMessage,
            type: "RESPONSE",
            ended,
            hasError,
            createdAt: ended ? Date.now() : undefined,
          });
        }

        if (ended || hasError) {
          tempMessage = "";
        }

        setTimeout(() => {
          if (containerRef && containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
          }
        }, 100);
      }
    });
  }, [addMessage, containerRef]);

  return (
    <div className="jv-max-h-[500px] jv-overflow-y-auto">
      <ChatDialog
        onBack={onBack}
        messages={messages}
        question={question}
        setQuestion={setQuestion}
        handleSubmit={handleSubmit}
        containerRef={containerRef}
        isSmall
        title={chatTitle}
      />
    </div>
  );
};
