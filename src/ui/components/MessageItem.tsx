import Clipboard from "clipboard";
import { cn } from "@ui/utils";
import { AIResponse } from "@ui/components/AIResponse";
import { MessageType } from "@src/types";
import { useEffect, useRef, useState } from "react";
import { MessageTypes } from "@src/types";

type MessageItemProps = {
  type: MessageType;
  content?: string;
  loading?: boolean;
  ended?: boolean;
  hasError?: boolean;
  createdAt?: number;
  selection?: string;
  isSmall?: boolean;
};

export const MessageItem = ({
  type,
  content,
  loading = false,
  ended = false,
  hasError,
}: MessageItemProps) => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const copyButtonRef = useRef<HTMLButtonElement>(null);

  const loader = (
    <div className="jv-flex jv-space-x-2">
      <span className="jv-w-2 jv-h-2 jv-bg-gray-600 jv-rounded-full jv-animate-[dotsLoader_0.6s_0s_infinite_alternate]" />
      <span className="jv-w-2 jv-h-2 jv-bg-gray-600 jv-rounded-full jv-animate-[dotsLoader_0.6s_0.6s_infinite_alternate]" />
      <span className="jv-w-2 jv-h-2 jv-bg-gray-600 jv-rounded-full jv-animate-[dotsLoader_0.6s_0.3s_infinite_alternate]" />
    </div>
  );

  useEffect(() => {
    let clipboard: Clipboard;
    if (copyButtonRef.current && containerRef.current && content && ended) {
      clipboard = new Clipboard(copyButtonRef.current, {
        text: () => content,
        container: containerRef.current,
      });
      clipboard.on("success", () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      });
    }

    return () => {
      clipboard?.destroy();
    };
  }, [copyButtonRef.current, containerRef.current, content, ended, setCopied]);

  if (hasError) {
    return <h2>error</h2>;
  }

  return (
    <div ref={containerRef} className="jv-relative">
      <div className="jv-bg-gray-200 jv-rounded-lg jv-px-4 jv-pt-4 jv-pb-8">
        {loading ? (
          loader
        ) : type === MessageTypes.Command ? (
          <p className="jv-text-gray-800">{content}</p>
        ) : (
          <AIResponse className="jv-prose dark:jv-prose-dark jv-overflow-auto">
            {content}
          </AIResponse>
        )}
      </div>
      <div
        className={cn("jv-flex -jv-mt-5", {
          "jv-justify-end": type === MessageTypes.Command,
          "jv-justify-between": type === MessageTypes.Response,
        })}
      >
        <div className="jv-w-10 jv-h-10 jv-rounded-lg jv-bg-primary-500 jv-mx-5 jv-overflow-hidden">
          <img
            className="jv-w-full jv-h-auto"
            src={chrome.runtime.getURL(
              type === MessageTypes.Command
                ? "user-avatar.jpg"
                : "javis-avatar.png"
            )}
          />
        </div>

        {type === MessageTypes.Response && ended && (
          <div className="jv-flex jv-items-center jv-justify-end jv-mt-8 jv-gap-2">
            <button
              ref={copyButtonRef}
              data-clipboard-text={content}
              className="javis-extension-button-copy jv-text-xs jv-bg-gray-100 hover:jv-bg-gray-200 jv-rounded-lg jv-px-2 jv-py-1 jv-font-medium jv-text-gray-700"
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <button className="jv-text-xs jv-bg-gray-100 hover:jv-bg-gray-200 jv-rounded-lg jv-px-2 jv-py-1 jv-font-medium jv-text-gray-700">
              Regenerate response
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
