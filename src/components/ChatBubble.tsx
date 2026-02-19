import { Scale, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  data: string;
  sender: boolean;
}
function ChatBubble({ data, sender }: ChatBubbleProps) {
  const alignmentClass = sender ? "flex-row-reverse" : "flex-row";
  const bubbleStyle = sender
    ? "bg-gray-200 text-black"
    : "bg-blue-900 text-white";
  const containerStyle = sender
    ? "bg-gray-900 text-white rounded-tl-xl"
    : "bg-white border-slate-200 border rounded-tr-xl ";
  return (
    <div className={`flex w-full max-w-6xl gap-2 my-2 ${alignmentClass}`}>
      {/*Icon*/}
      <div
        className={`h-8 w-8 flex items-center justify-center rounded-full shrink-0 ${bubbleStyle}`}
      >
        {sender ? <User size={18} /> : <Scale size={18} />}
      </div>
      {/*Message*/}
      <div
        className={`p-4 rounded-b-xl shadow-sm max-w-2xl leading-relaxed ${containerStyle}`}
      >
        <ReactMarkdown>{data}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ChatBubble;
