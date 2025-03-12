import { deflate, inflate } from "pako";

export interface IBackupData {
  version: number;
  trickStates: { [key: string]: number };
  age: number;
  weight: number;
  totalCalories: number;
  hapticsEnabled: boolean;
}

export class BackupError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = "BackupError";
  }
}

export class BackupService {
  private static readonly CURRENT_VERSION = 1;

  private static stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  private static uint8ArrayToString(array: Uint8Array): string {
    const decoder = new TextDecoder();
    return decoder.decode(array);
  }

  private static toBase64(uint8Array: Uint8Array): string {
    const binaryString = Array.from(uint8Array)
      .map((byte) => String.fromCharCode(byte))
      .join("");
    return btoa(binaryString);
  }

  private static fromBase64(base64: string): Uint8Array {
    const pad = base64.length % 4;
    const paddedBase64 = pad ? base64 + "=".repeat(4 - pad) : base64;
    const binaryString = atob(paddedBase64);
    return Uint8Array.from(binaryString, (char) => char.charCodeAt(0));
  }

  static async createBackup(
    data: Omit<IBackupData, "version">
  ): Promise<string> {
    try {
      const nonZeroTricks: { [key: string]: number } = {};
      Object.entries(data.trickStates).forEach(([key, value]) => {
        if (value > 0) {
          nonZeroTricks[key] = value;
        }
      });

      const backupData: IBackupData = {
        version: this.CURRENT_VERSION,
        trickStates: nonZeroTricks,
        age: data.age || 0,
        weight: data.weight || 0,
        totalCalories: Math.max(0, Math.round(data.totalCalories || 0)),
        hapticsEnabled: data.hapticsEnabled,
      };

      console.log("Creating backup with data:", backupData);

      const jsonString = JSON.stringify(backupData);
      const uint8Array = this.stringToUint8Array(jsonString);
      const compressed = deflate(uint8Array, { level: 9 });
      const base64 = this.toBase64(compressed);
      const urlSafe = base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");

      console.log("Backup string length:", urlSafe.length);

      if (urlSafe.length > 4296) {
        throw new BackupError(
          "Backup data too large for QR code",
          "SIZE_EXCEEDED"
        );
      }

      return urlSafe;
    } catch (error) {
      console.error("Backup creation error:", error);
      throw new BackupError("Failed to create backup", "CREATE_FAILED");
    }
  }

  static validateFormat(backupString: string): boolean {
    try {
      console.log("Validating string length:", backupString.length);

      if (backupString.length > 4296) {
        console.log("String too long for QR code");
        return false;
      }

      const base64 = backupString.replace(/-/g, "+").replace(/_/g, "/");
      const uint8Array = this.fromBase64(base64);
      inflate(uint8Array);

      return true;
    } catch (error) {
      console.log("Validation error:", error);
      return false;
    }
  }

  static async restoreFromBackup(backupString: string): Promise<IBackupData> {
    try {
      console.log("Starting restore from backup, length:", backupString.length);

      if (!this.validateFormat(backupString)) {
        throw new BackupError("Invalid backup code format", "INVALID_FORMAT");
      }

      const base64 = backupString.replace(/-/g, "+").replace(/_/g, "/");
      const uint8Array = this.fromBase64(base64);
      const decompressed = inflate(uint8Array, { to: "string" });
      const data: IBackupData = JSON.parse(decompressed);

      console.log("Restored data:", data);

      if (data.version !== this.CURRENT_VERSION) {
        throw new BackupError(
          "Incompatible backup version",
          "VERSION_MISMATCH"
        );
      }

      const fullTrickStates = { ...data.trickStates };
      Object.keys(data.trickStates).forEach((key) => {
        if (!(key in fullTrickStates)) {
          fullTrickStates[key] = 0;
        }
      });

      const restoredData = {
        version: data.version,
        trickStates: fullTrickStates,
        age: data.age || 0,
        weight: data.weight || 0,
        totalCalories: Math.max(0, Math.round(Number(data.totalCalories) || 0)),
        hapticsEnabled: Boolean(data.hapticsEnabled),
      };

      console.log("Final restored data:", restoredData);
      return restoredData;
    } catch (error) {
      console.error("Restore error:", error);
      if (error instanceof BackupError) {
        throw error;
      }
      throw new BackupError("Failed to restore backup", "RESTORE_FAILED");
    }
  }
}
