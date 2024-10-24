import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { devices } from 'puppeteer';

import {
	nodeDescription,
} from './Puppeteer.node.options';
import { startBrowser } from './puppeteer/core/start';
import { pageGoto } from './puppeteer/core/pageGoto';
import { pageClick } from './puppeteer/core/pageClick';
import { pageWaitForSelector } from './puppeteer/core/pageWaitForSelector';
import { pageType } from './puppeteer/core/pageType';

export class Puppeteer implements INodeType {
	description: INodeTypeDescription = nodeDescription;

	methods = {
		loadOptions: {
			async getDevices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const deviceNames = Object.keys(devices);
				const returnData: INodePropertyOptions[] = [];

				for (const name of deviceNames) {
					const device = devices[name];
					returnData.push({
						name,
						value: name,
						description: `${device.viewport.width} x ${device.viewport.height} @ ${device.viewport.deviceScaleFactor}x`,
					});
				}

				return returnData;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const returnData: INodeExecutionData[] = [];
		const instance = this.getNodeParameter('instance', 0,{}) as string;
		const operation = this.getNodeParameter('operation', 0,{}) as string;
		let returnItem: any;
		console.log(operation, instance, "minhas operações")
		if (operation === "browserContext") {
			const options = this.getNodeParameter('browserOptions', 0,{}) as IDataObject;
			const browserAction = this.getNodeParameter('browserActions', 0,{}) as string;
			if (browserAction === "newPage") {
				const result = await startBrowser({
					instance,
					options
				})
				if(result?.error){
					if(this.continueOnFail() !== true){
						returnItem = {
							json: {
								error: result?.error
							}
						 }
					}else{
						throw new Error(result?.error)
					}
				}else{
					returnItem = {
						json: {
							...result
						}
					 }
				}
			}
		}

		if (operation === "pageContext") {
			const pageAction = this.getNodeParameter('pageOperation', 0,{}) as string;
			if (pageAction === "pageGoto") {
				const url = this.getNodeParameter('pageUrl', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageGoto({
					instance,
					url,
					options
				})
				if(result?.statusCode !== 200){
					if(this.continueOnFail() !== true){
						returnItem = {
							json: {
								headers: result?.headers,
								statusCode: result?.statusCode
							}
						 }
					}else{
						throw new Error(`Request failed with status code ${result?.statusCode}`)
					}
				}else{
					returnItem = {
						json: {
							headers: result?.headers,
							statusCode: result?.statusCode
						}
					 }
				}
			}

			if (pageAction === "pageClick") {
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				await pageClick({
					instance,
					selector,
					options
				})
			}

			if (pageAction === "pageWaitForSelector") {
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				await pageWaitForSelector({
					instance,
					selector,
					options
				})
			}

			if (pageAction === "pageType") {
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const text = this.getNodeParameter('pageTypeText', 0,{}) as string;

				await pageType({
					instance,
					selector,
					text,
					options
				})
			}
		}
		if(returnItem){
			returnData.push(returnItem)
		}
		return this.prepareOutputData(returnData);
	}
}
