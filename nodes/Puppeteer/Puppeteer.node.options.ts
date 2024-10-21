import { INodeTypeDescription } from "n8n-workflow";

/**
 * Options to be displayed
 */
export const nodeDescription: INodeTypeDescription = {
	displayName: "Puppeteer",
	name: "puppeteer",
	group: ["puppeteer"],
	version: 1,
	description: "Request a webpage using Puppeteer",
	defaults: {
		name: "Puppeteer",
		color: "#125580",
	},
	icon: "file:puppeteer.svg",
	inputs: ["main"],
	outputs: ["main"],
	properties: [
		{
			displayName: "Operation",
			name: "operation",
			type: "options",
			options: [
				{
					name: "Launch",
					value: "launchBrowser",
					description: "Launch a new browser instance",
				},
				{
					name: "Connect",
					value: "connectBrowser",
					description: "Connect to an existing browser instance",
				},
			],
			default: "launchBrowser",
		},
		{
			displayName: "Browser WSEndpoint",
			name: "browserWSEndpoint",
			type: "string",
			required: true,
			default: "",
			displayOptions: {
				show: {
					operation: ["connectBrowser"],
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
					displayName: "Headless mode",
					name: "headless",
					type: "boolean",
					required: false,
					default: true,
					description:
						"Whether to run browser in headless mode. Defaults to true.",
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
			],
			displayOptions: {
				show: {
					operation: ["connectBrowser", "launchBrowser"],
				},
			},
		},
	],
};
