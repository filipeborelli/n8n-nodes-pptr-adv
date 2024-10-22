import { INodeProperties } from "n8n-workflow";
import { PageOperations } from "./Page";

export const ContextOperations: INodeProperties[] = [
    {
        displayName: "Context",
        name: "context",
        type: "options",
        options: [
            {
                name: "Page",
                value: "pageContext",
                description: "Use the page context",
            },
            {
                name: "Locator",
                value: "locatorContext",
                description: "Use the locator context",
            },
            {
                name: "CDPSession",
                value: "cdpSessionContext",
                description: "Use the CDP session context",
            },
        ],
        default: "pageContext",
        displayOptions: {
            show: {
                operation: ["connectBrowser","launchBrowser"],
            },
        },
    },
    ...PageOperations
]