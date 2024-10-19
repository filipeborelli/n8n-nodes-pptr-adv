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
					name: "Browser",
					value: "browser",
					description: "Browser context",
				},
				{
					name: "Page",
					value: "page",
					description: "page context",
				},
				{
					name: "Target",
					value: "target",
					description: "target context",
				},
				{
					name: "Mouse",
					value: "mouse",
					description: "mouse context",
				},
				{
					name: "Keyboard",
					value: "keyboard",
					description: "keyboard context",
				},
				{
					name: "Frame",
					value: "frame",
					description: "frame context",
				},
				{
					name: "Dialog",
					value: "dialog",
					description: "dialog context",
				},
				{
					name: "Network",
					value: "network",
					description: "network context",
				},
			],
			default: "browser",
		},
		{
			displayName: "Browser Operation",
			name: "browserOperation",
			type: "options",
			required: true,
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
				{
					name: "Close",
					value: "closeBrowser",
					description: "Close the browser instance",
				},
				{
					name: "Test",
					value: "testBrowser",
					description: "Test the browser instance",
				},
			],
			default: "launchBrowser",
			displayOptions: {
				show: {
					operation: ["browser"],
				},
			},
		},
	],
};
