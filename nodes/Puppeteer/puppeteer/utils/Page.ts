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
                name: "Wait For Frame",
                value: "pageWaitForFrame",
                description: "Wait for the frame",
            },
            {
                name: "Wait For Navigation",
                value: "pageWaitForNavigation",
                description: "Wait for the navigation",
            },
            {
                name: "Wait For Function",
                value: "pageWaitForFunction",
                description: "Wait for the function",
            },
            {
                name: "Wait For Request",
                value: "pageWaitForRequest",
                description: "Wait for the request",
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
        displayName: "Selector",
        name: "pageSelector",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                pageOperation: ["page$","pageClick","pageType","pageHover","pageWaitForSelector"],
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
        displayName: "Url Or Predicate",
        name: "pageUrlOrPredicate",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                pageOperation: ["pageWaitForFunction","pageWaitForFrame","pageWaitForRequest"],
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
        default: "",
        displayOptions: {
            show: {
                pageOperation: ["page$","pageAddScriptTag","pageClick","pageGoto","pageType","pageGoBack","pageGoForward","pageReload","pageWaitForSelector","pageWaitForNavigation","pageWaitForFunction","pageWaitForFrame","pageWaitForRequest"],
            },
        },
    },
    {
        displayName: "Args",
        name: "pageArgs",
        type: "string",
        required: true,
        default: "",
        displayOptions: {
            show: {
                pageOperation: ["pageWaitForFunction"],
            },
        },
    },
    {
        displayName: "Javascript Function",
        name: "pageEvaluateFunction",
        type: "string",
        default: "// Run a javascript function on the page\nawait page.evaluate(() => {\n console.log('Hello from the browser'); \n});",
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