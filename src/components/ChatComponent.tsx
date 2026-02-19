import { Scale } from "lucide-react";
import HeroText from "./HeroText";
import SearchInput from "./SearchInput";
import ChatBubble from "./ChatBubble";
import { useState } from "react";

interface Message {
  isSender: boolean;
  message: string;
}

function ChatComponent() {
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchQuery = async (prompt: string) => {
    const userMsg = { isSender: true, message: prompt };
    const aiMsg = { isSender: false, message: "" };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setIsStreaming(true);

    const response = await fetch("http://127.0.0.1:8000/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: prompt }),
    });

    if (response.body == null) {
      return;
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let buffer = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const rawChunk = decoder.decode(value, { stream: true });

      buffer += rawChunk;
      const parts = buffer.split("\n\n");

      buffer = parts.pop() ?? "";
      parts.map((part) => {
        processChunk(part);
      });
    }
  };

  const processChunk = (message: string) => {
    const cleanMessage = message.replace(/^data: /, "").trim();

    try {
      const parsed = JSON.parse(cleanMessage);
      if (parsed.is_final) {
        setIsStreaming(false);
      } else {
        setMessages((prev) => {
          const newHistory = [...prev];
          const lastIndex = newHistory.length - 1;
          newHistory[lastIndex] = {
            ...newHistory[lastIndex],
            message: newHistory[lastIndex].message + parsed.token,
          };
          return newHistory;
        });
      }
    } catch {}
  };

  const inputArea = messages.length === 0 ? "flex-1" : "sticky bottom-0 mb-8";

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto justify-center">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <HeroText />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                data={message.message}
                sender={message.isSender}
              />
            ))}
          </div>
        )}
      </div>
      <div className={`flex justify-center ${inputArea}`}>
        <SearchInput onSearch={fetchQuery} isStreaming={isStreaming} />
      </div>
    </div>
  );
}

export default ChatComponent;
