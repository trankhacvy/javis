import { Actions, Command as CommandType, Message } from "@src/types";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { CommandMenu } from "./CommandMenu";
import { useRef, useState, useEffect } from "react";
import { ChatDialog } from "./ChatDialog";
import { useAppStore } from "../store";
import { cn } from "../utils";

type JavisPopoverProps = {
  trigger?: React.ReactNode;
  commands: { group: string; commands: CommandType[] }[];
  messages?: Message[];
  selectionText?: string;
};

export const JavisPopover = ({
  trigger,
  commands,
  selectionText,
}: JavisPopoverProps) => {
  const [showChat, setShowChat] = useState(false);

  const addMessage = useAppStore((state) => state.addMessage);
  const setChatTitle = useAppStore((state) => state.setChatTitle);
  const clearChat = useAppStore((state) => state.clearChat);

  return (
    <Popover defaultOpen>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className={cn("jv-p-0 !jv-w-[512px] 2xl:!jv-w-[768px]")}>
        {showChat ? (
          <div className="jv-h-[60vh]">
            <ChatView
              onBack={() => {
                chrome.runtime.sendMessage({
                  type: Actions.ClearMemory,
                });
                clearChat();
                setShowChat(false);
              }}
            />
          </div>
        ) : (
          <CommandMenu
            commands={commands}
            selectionText={selectionText}
            onEnter={(text: string) => {
              clearChat();
              setChatTitle(text ?? "");
              setShowChat(true);
              addMessage({
                type: "COMMAND",
                content: text,
                selection: selectionText,
              });
              chrome.runtime.sendMessage({
                type: "SEND_COMMAND",
                prompt: text,
                selectionText,
              });
            }}
            onCommand={(command, option) => {
              if (selectionText) {
                if (selectionText) {
                  clearChat();
                  setChatTitle(
                    [command.name, option?.text].filter(Boolean).join(": ") ??
                      ""
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
              }
            }}
            commandListClassName="jv-max-h-[40vh]"
          />
        )}
      </PopoverContent>
    </Popover>
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
    setQuestion("");
    // send message to background
    chrome.runtime.sendMessage({
      type: "SEND_COMMAND",
      message: question,
    });
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
    <ChatDialog
      onBack={onBack}
      messages={messages}
      question={question}
      setQuestion={setQuestion}
      handleSubmit={handleSubmit}
      containerRef={containerRef}
      title={chatTitle}
      isSmall
    />
  );
};
