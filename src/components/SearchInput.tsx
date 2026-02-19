import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
interface SearchInputProps {
  onSearch: (query: string) => void;
  isStreaming: boolean;
}
function SearchInput({ onSearch, isStreaming }: SearchInputProps) {
  const [prompt, setPrompt] = useState<string>("");

  const handleSearch = (e: React.SyntheticEvent) => {
    e.preventDefault();
    onSearch(prompt);
    setPrompt("");
  };

  return (
    <div className="w-full py-2 max-w-4xl">
      <form onSubmit={handleSearch}>
        <div className="border border-solid border-slate-200 bg-white rounded-2xl flex items-center gap-3 p-2 shadow-sm hover:shadow-md transition-shadow ">
          <div className="text-slate-400">
            <Search size={24} />
          </div>
          <input
            placeholder="Ask about Philippine laws, cases, or procedures..."
            className="flex-grow bg-transparent outline-none h-10"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-blue-900 text-white rounded-xl p-2 disabled:bg-gray-400"
            type="submit"
            disabled={isStreaming || prompt === ""}
          >
            {isStreaming ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : (
              <ArrowRight />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchInput;
