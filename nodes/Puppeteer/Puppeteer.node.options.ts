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
			type: "string",
			required: true,
			default: "data",
			description:
				"Operation to perform on the browser",
			displayOptions: {
				show: {
					operation: ["browser"],
				},
			},
		},
	],
};
