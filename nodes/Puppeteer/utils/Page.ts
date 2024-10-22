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
                browserContext: ["pageContext"],
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
                pageOperation: ["page$","pageEvaluate"],
            },
        },
    },
    {
        displayName: "Options",
        name: "pageOptions",
        type: "string",
        default: "",
        typeOptions:{
            editor: "codeNodeEditor",
            editorLanguage: "json",
        },
        displayOptions: {
            show: {
                pageOperation: ["page$","pageAddScriptTag"],
            },
        },
    },

    {
        displayName: "Javascript Function",
        name: "pageEvaluateFunction",
        type: "string",
        default: "// Run a javascript function on the page\n await page.evaluate(() => {\n console.log('Hello from the browser'); \n});",
        typeOptions: {
            editor: "codeNodeEditor",
            editorLanguage: "javaScript",
        },
        displayOptions: {
            show: {
                pageOperation: ["pageEvaluate"],
            },
        },
    },
]