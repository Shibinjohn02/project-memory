import type { ActionItem, Decision } from "./document.types";

export function mapDecisions(decisions: Decision[]) {
    return decisions.map((decision) => ({
        ...decision,
        status: "active",
    }));
}


export function mapActionItems(actionItems: ActionItem[]) {
    return actionItems.map((item) => ({
        ...item,
    }));
}