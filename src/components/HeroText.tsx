import { Scale } from "lucide-react";

function HeroText() {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <div className="h-16 w-16 rounded-full bg-sky-100 flex justify-center items-center text-blue-900 mb-8">
        <Scale size={32} />
      </div>
      <h1 className="font-bold text-3xl">Philippine Legal Intelligence</h1>
      <p className="text-slate-500 text-lg max-w-lg text-center">
        An open-source RAG system grounded in the 1987 Constitution, Republic
        Acts, and Supreme Court Decisions.
      </p>
    </div>
  );
}

export default HeroText;
