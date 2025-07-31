import { Reason } from "@prisma/client";

export interface ReportContent {
    postId?: number;
    commentId?: number;
    userId: string;
    reason: Reason;
    text?: string;
}