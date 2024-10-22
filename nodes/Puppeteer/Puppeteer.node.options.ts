import { INodeTypeDescription } from "n8n-workflow";
import { BrowserOperations } from "./utils/Browser";
import { ContextOperations } from "./utils/Context";

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
		...BrowserOperations,
		...ContextOperations
	],
};
