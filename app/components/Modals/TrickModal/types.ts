export interface TrickModalProps {
  isVisible: boolean;
  onClose: () => void;
  trickId: string;
  completionState: number;
  onCompletionChange: (trickId: string, state: number) => void;
}

export interface HeaderProps {
  onClose: () => void;
  onVHSPress: () => void;
  isConnected: boolean;
  videoLink: string;
}

export interface InfoProps {
  name: string;
  altNames?: string;
  difficulty: string;
}

export interface ProgressProps {
  name: string;
  completionState: number;
  onButtonSelection: (value: "yes" | "sometimes" | "no") => void;
}
