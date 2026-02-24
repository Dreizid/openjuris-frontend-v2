import { useState } from "react";
import { ISSUE_TYPES } from "@/services/flagService";

function IssueTypeSelector() {
  const [activeIssue, setActiveIssue] = useState("");
  const issueType = ISSUE_TYPES;
  return (
    <div className="grid grid-cols-2 gap-2">
      {issueType.map((issue) => (
        <button
          type="button"
          key={issue}
          onClick={() => setActiveIssue(issue)}
          className={`transition-colors cursor-pointer border border-slate-200 rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:shadow ${activeIssue === issue ? "bg-blue-50 border-blue-200" : ""}`}
        >
          {issue}
        </button>
      ))}
      <input
        type="hidden"
        id="selected-issue"
        name="issueType"
        value={activeIssue}
      />
    </div>
  );
}

export default IssueTypeSelector;
