import { INodeProperties } from "n8n-workflow";

export const PageOperations: INodeProperties[] = [
    {
        displayName: "Page Operation",
        name: "pageOperation",
        type: "options",
        options: [
            {
                name: "Page Go To",
                value: "pageGoto",
                description: "Navigate to the URL",
            },
            {
                name: "Page Go Back",
                value: "pageGoBack",
                description: "Navigate to the previous page",
            },
            {
                name: "Page Go Forward",
                value: "pageGoForward",
                description: "Navigate to the next page",
            },
            {
                name: "Page Reload",
                value: "pageReload",
                description: "Reload the page",
            },
            {
                name: "Page close",
                value: "pageClose",
                description: "Close the page",
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
            {
                name: "Click",
                value: "pageClick",
                description: "Click on the selector",
            },
            {
                name: "Type",
                value: "pageType",
                description: "Type on the selector",
            },
            {
                name: "Content",
                value: "pageContent",
                description: "Get the content of the page",
            },
            {
                name: "Cookies",
                value: "pageCookies",
                description: "Get the cookies of the page",
            },
            {
                name: "Delete Cookie",
                value: "pageDeleteCookie",
                description: "Delete a cookie",
            },
            {
                name: "Set Cookies",
                value: "pageSetCookies",
                description: "Set cookies",
            },
            {
                name: "Hover",
                value: "pageHover",
                description: "Hover on the selector",
            },
            {
                name: "Wait For Selector",
                value: "pageWaitForSelector",
                description: "Wait for the selector",
            },
            {
                name: "Wait For Navigation",
                value: "pageWaitForNavigation",
                description: "Wait for the navigation",
            },
            {
                name: "Solve Captcha",
                value: "pageSolveCaptcha",
                description: "Use the 2captcha service to solve the captcha",
            }
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
        displayName: "URL",
        name: "pageUrl",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                pageOperation: ["pageGoto"],
            },
        },
    },
    {
        displayName: "IFrame Selector",
        name: "iFrameSelector",
        type: "string",
        required: false,
        default: "",
        description: "Optional: Selector of the iframe to interact with",
        displayOptions: {
            show: {
                pageOperation: ["pageEvaluate","pageWaitForSelector","pageClick","pageType","pageHover"],
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
                pageOperation: ["pageClick","pageType","pageHover","pageWaitForSelector"],
            },
        },
    },
    {
        displayName: "Text",
        name: "pageTypeText",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                pageOperation: ["pageType"],
            },
        },
    },

    {
        displayName: "Cookies",
        name: "pageCookiesOptions",
        type: "json",
        default: [ 
            { 
                "domain": "", 
                "name": "", 
                "partitionKey": "", 
                "path": "", 
                "url": "" 
            }],
        displayOptions: {
            show: {
                pageOperation: ["pageDeleteCookie","pageSetCookies"],
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
                pageOperation: ["pageAddScriptTag","pageClick","pageGoto","pageType","pageGoBack","pageGoForward","pageReload","pageWaitForSelector","pageWaitForNavigation"],
            },
        },
    },
    {
        displayName: "Javascript Function",
        name: "pageEvaluateFunction",
        type: "string",
        default: "//Run a javascript function on the page \nconst inputs = document.querySelectorAll('input')",
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
    {
        displayName: "Evaluate Args",
        name: "evaluateArgs",
        type: "json",
        description: "Variables to pass to the evaluate function",
        default: {},
        displayOptions: {
            show: {
                pageOperation: ["pageEvaluate"],
            },
        },
    },
]