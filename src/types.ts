export type CommandOption = {
  text: string;
  prompt: string;
};

export type Command = {
  icon?: string;
  name: string;
  prompt?: string;
  needSelection?: boolean;
  group: string;
  template?: string;
  keys?: string[];
  options?: CommandOption[];
};

export type MessageType = "COMMAND" | "RESPONSE";

export const MessageTypes: Record<string, MessageType> = {
  Command: "COMMAND",
  Response: "RESPONSE",
};

export const Actions = {
  SendCommand: "SEND_COMMAND",
  ClearMemory: "CLEAR_MEMORY",
  StopGenerate: "STOP_GENERATE",
};


export interface Message {
  messageId: string;
  type: MessageType;
  content: string;
  selection?: string;
  createdAt: number;
  loading?: boolean;
  ended?: boolean;
  hasError?: boolean;
}

export const ElementIds = {
  BubbleButtonContainer: "javis-button-container",
  InlinePopupContainer: "javis-popover-container",
  DialogContainer: "javis-dialog-container",
};
