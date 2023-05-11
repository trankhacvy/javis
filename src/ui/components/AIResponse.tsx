import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function AIResponse(props: any) {
  return <ReactMarkdown remarkPlugins={[remarkGfm]} {...props} />;
}
