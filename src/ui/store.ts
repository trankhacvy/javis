import { create } from "zustand";
import { produce } from "immer";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@src/types";

interface AppState {
  messages: Message[];
  loading?: boolean;
  title?: string;
  addMessage: (message: Partial<Message>) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  setChatTitle: (title: string) => void;
  clearChat: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  messages: [],
  loading: false,
  title: "",
  addMessage: (message: Partial<Message>) =>
    set(
      produce((state) => {
        if (!message.messageId) {
          message.messageId = uuidv4();
        }
        if (!message.createdAt) {
          message.createdAt = Date.now();
        }
        state.messages = [...state.messages, message];
      })
    ),
  updateMessage: (id: string, message: Partial<Message>) =>
    set(
      produce((state) => {
        const idx = state.messages.findIndex(
          (msg: Message) => msg.messageId === id
        );
        if (idx >= 0) {
          state.messages[idx] = {
            ...state.messages[idx],
            ...message,
            loading: false,
          };
        } else {
          const currentMessages = state.messages;
          state.messages = [
            ...currentMessages,
            {
              messageId: id,
              loading: true,
              ...message,
            },
          ];
        }
      })
    ),
  setChatTitle: (title: string) =>
    set(
      produce((state) => {
        state.title = title;
      })
    ),
  clearChat: () =>
    set(
      produce((state) => {
        state.messages = [];
        state.loading = false;
      })
    ),
}));
