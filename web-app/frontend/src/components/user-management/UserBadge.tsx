import React from "react";
import { Vote, Crown, FileSignature } from "lucide-react";
interface UserBadgeProps {
  type: string;
}
export function UserBadge({ type }: UserBadgeProps) {
  switch (type) {
    case "voting":
      return (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
          title="Voting Delegate - Can vote on organizational matters"
        >
          <Vote className="h-3 w-3 mr-1" />
          Voting
        </span>
      );
    case "board":
      return (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
          title="Board Member - Serves on the organization's board"
        >
          <Crown className="h-3 w-3 mr-1" />
          Board
        </span>
      );
    case "legal":
      return (
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
          title="Legal Authorization - Can sign MOUs and legal documents"
        >
          <FileSignature className="h-3 w-3 mr-1" />
          Legal
        </span>
      );
    default:
      return null;
  }
}
