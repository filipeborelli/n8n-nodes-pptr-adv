import { INodeProperties } from "n8n-workflow";

export const PageOperations: INodeProperties[] = [
    {
        displayName: "Page Operation",
        name: "pageOperation",
        type: "options",
        options: [
            {
                name: "Page $",
                value: "page$",
                description: "Evaluate the selector",
            },
            {
                name: "Page evaluate",
                value: "pageEvaluate",
                description: "Evaluate page function",
            },
            {
                name: "Add Script Tag",
                value: "pageAddScriptTag",
                description: "Add a script tag to the page",
            },
        ],
        required: true,
        default: "",
        displayOptions: {
            show: {
                operation: ["pageContext"],
            },
        },
    },
    {
        displayName: "Selector",
        name: "pageSelector",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                operation: ["page$","pageEvaluate"],
            },
        },
    },
    {
        displayName: "Options",
        name: "pageOptions",
        type: "json",
        default: {},
        displayOptions: {
            show: {
                operation: ["page$","pageAddScriptTag"],
            },
        },
    },

    {
        displayName: "Javascript Function",
        name: "pageEvaluateFunction",
        type: "string",
        default: "",
        typeOptions: {
            editor: "codeNodeEditor",
            editorLanguage: "javaScript",
        },
        displayOptions: {
            show: {
                operation: ["pageEvaluate"],
            },
        },
    },
]