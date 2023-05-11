import { ChevronLeft, SendIcon } from "lucide-react";
import { MessageItem } from "@ui/components/MessageItem";
import { Message } from "@src/types";
import { cn } from "../utils";

type ChatDialogType = {
  onBack: VoidFunction;
  messages: Message[];
  question: string;
  setQuestion: (question: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  title?: string;
  isSmall?: boolean;
};

export function ChatDialog({
  onBack,
  messages,
  question,
  setQuestion,
  handleSubmit,
  containerRef,
  title = "",
  isSmall = false,
}: ChatDialogType) {
  return (
    <div className="jv-flex jv-flex-col jv-w-full jv-h-full">
      {/* header */}
      <div
        className={cn(
          "jv-flex jv-items-center jv-pl-2 jv-pr-4 jv-py-3 jv-gap-2 jv-border-b jv-border-b-gray-500/24"
        )}
      >
        <button
          onClick={onBack}
          className={cn(
            "jv-inline-flex jv-items-center jv-justify-center jv-rounded-full jv-p-2 jv-text-gray-600 hover:jv-bg-gray-600/[0.08]"
          )}
        >
          <ChevronLeft className="jv-h-5 jv-w-5" />
        </button>
        <p className="jv-text-sm jv-font-semibold jv-text-gray-900 jv-truncate">
          {title}
        </p>
      </div>
      {/* content */}
      <div
        className={cn(
          "jv-space-y-6 jv-p-4 jv-border-b jv-border-b-gray-200 jv-flex-1 jv-grow jv-overflow-y-auto"
        )}
        ref={containerRef}
      >
        {messages.map(
          ({
            messageId,
            type,
            content,
            loading,
            createdAt,
            ended,
            hasError,
            selection,
          }) => {
            return (
              <MessageItem
                key={messageId}
                content={content}
                loading={loading}
                createdAt={createdAt}
                type={type}
                ended={ended}
                hasError={hasError}
                selection={selection}
                isSmall={isSmall}
              />
            );
          }
        )}
      </div>
      {/* footer */}
      <form
        className={cn(
          "jv-relative jv-border-t jb-border-t-gray-500/24 jv-px-4 jv-py-2"
        )}
        onSubmit={handleSubmit}
      >
        <div className="jv-flex jv-gap-2 jjv-px-3 jv-items-center jv-justify-center jv-overflow-hidden">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            className={cn(
              "jv-w-full jv-border-none jv-h-10 jv-py-1.5 jv-rounded-none jv-text-gray-800 placeholder:jv-text-gray-500 focus:jv-outline-none"
            )}
            placeholder="Ask me anything..."
          />
          {question && (
            <button
              type="submit"
              className={cn(
                "jv-inline-flex jv-items-center jv-shrink-0 jv-justify-center jv-rounded-full jv-p-2 jv-text-gray-600 hover:jv-bg-gray-600/8"
              )}
            >
              <SendIcon className="jv-h-5 jv-w-5" />
            </button>
            // <button
            //   type="submit"
            //   className={cn(
            //     "jv-bg-primary-500 jv-text-white jv-shrink-0 jv-flex jv-items-center jv-justify-center",
            //     {
            //       "jv-w-8 jv-h-8 jv-rounded-lg jv-text-base": !isSmall,
            //       "jv-w-6 jv-h-6 jv-rounded-md jv-text-sm": isSmall,
            //     }
            //   )}
            // >
            //   <ChevronUp />
            // </button>
          )}
        </div>
      </form>
    </div>
  );
}
