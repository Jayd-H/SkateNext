import { ReactNode } from "react";

export interface ButtonProps {
  id: string;
  name: string;
  onPress: (id: string) => void;
  isCompleted?: number;
  isCompletedInfo?: boolean;
}

export interface FolderButtonProps {
  id: string;
  title: string;
  containedTricks: string[];
  onPress: (id: string) => void;
  trickCompletionStates: Record<string, number>;
  nodeTitle: string;
}
