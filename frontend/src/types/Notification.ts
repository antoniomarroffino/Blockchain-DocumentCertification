export interface Notification {
    id: string;
    type: "certified" | "revoked";
    documentHash: string;
    timestamp: number;
    sender: string;
    reason?: string;
}
