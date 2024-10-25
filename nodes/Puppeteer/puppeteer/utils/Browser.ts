import { INodeProperties } from "n8n-workflow";
import { PageOperations } from "./Page";


const BrowserOptions: INodeProperties[] = [
    {
        displayName: "Action",
        name: "browserActions",
        type: "options",
        options: [
            {
                name: "New Page",
                value: "newPage",
                description: "Create a new page in the browser instance.",
            },
            {
                name: "Targets",
                value: "targets",
                description: "Get the list of targets in the browser instance.",
            },
            {
                name: "Close",
                value: "closeBrowser",
                description: "Close the browser instance.",
            },
        ],
        default: "newPage",
        displayOptions: {
            show: {
                operation: ["browserContext"],
            },
        },
    },
    {
        displayName: "Use 2Captcha solver",
        name: "twoCaptchaToken",
        description: "The 2Captcha API key to use for solving captchas.",
        type: "string",
        required: false,
        default: "",
        displayOptions: {
            show: {
                browserActions: ["newPage"],
            },
        },
    },
    {
        displayName: "Browser Options",
        name: "browserOptions",
        type: "collection",
        placeholder: "Add Option",
        default: {},
        options: [
            {
                displayName: "Browser WSEndpoint",
                name: "browserWSEndpoint",
                type: "string",
                required: false,
                default: "",
                description:
                    "A browser websocket endpoint to connect to. If specified, the browser will be connected to this browser instance.",
            },
            {
                displayName: "Emulate Device",
                name: "device",
                type: "options",
                default: "",
                typeOptions: {
                    loadOptionsMethod: "getDevices",
                },
                required: false,
            },
            {
                displayName: "Launch Arguments",
                name: "launchArguments",
                placeholder: "Add Argument",
                type: "fixedCollection",
                typeOptions: {
                    multipleValues: true,
                },
                description:
                    "Additional command line arguments to pass to the browser instance.",
                default: {},
                options: [
                    {
                        name: "args",
                        displayName: "",
                        values: [
                            {
                                displayName: "Argument",
                                name: "arg",
                                type: "string",
                                default: "",
                                description:
                                    "The command line argument to pass to the browser instance.",
                            },
                        ],
                    },
                ],
            },
            {
                displayName: "Handle Browser Close",
                name: "handleBrowserClose",
                type: "boolean",
                required: false,
                default: false,
                description: "When browser is closed, the browser process",
            },
            {
                displayName: "Handle Target",
                name: "handleTarget",
                type: "boolean",
                required: false,
                default: false,
                description: "When target created or destroyed, the target process",
            },
            {
                displayName: "Handle Browser Disconnect",
                name: "handleBrowserDisconnect",
                type: "boolean",
                required: false,
                default: false,
                description: "When browser is disconnected, the browser process",
            },
            {
                displayName: "Stealth mode",
                name: "stealth",
                type: "boolean",
                required: false,
                default: false,
                description:
                    "When enabled, applies various techniques to make detection of headless Puppeteer harder.",
            },
            {
                displayName: "Proxy Server",
                name: "proxyServer",
                type: "string",
                required: false,
                default: "",
                description:
                    "This tells Puppeteer to use a custom proxy configuration. Examples: localhost:8080, socks5://localhost:1080, etc.",
            },
            {
                displayName: "Slow Mo",
                name: "slowMo",
                type: "number",
                required: false,
                default: 0,
                description:
                    "Slows down Puppeteer operations by the specified amount of milliseconds.",
            },
        ],
        displayOptions: {
            show: {
                browserActions: ["newPage"],
            },
        },
    },
  
]

export const BrowserOperations: INodeProperties[] = [

    {
        displayName: "Instance Identifier",
        name: "instance",
        description: "A unique identifier for the browser and page instance, used to reference the same instance in multiple nodes.",
        type: "string",
        required: true,
        default: "",
    },
    {
        displayName: "Operation",
        name: "operation",
        type: "options",
        options: [
            {
                name: "Browser",
                value: "browserContext",
                description: "Use the browser context",
            },
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
        default: "browserContext",
    },
    ...BrowserOptions,
    ...PageOperations
   
]


