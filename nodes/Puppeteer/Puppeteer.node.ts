import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
} from 'n8n-workflow';

import { KnownDevices } from 'puppeteer'
const devices = KnownDevices;

import {
	nodeDescription,
} from './Puppeteer.node.options';
import { startBrowser } from './puppeteer/core/start';
import { pageGoto } from './puppeteer/core/pageGoto';
import { pageClick } from './puppeteer/core/pageClick';
import { pageWaitForSelector } from './puppeteer/core/pageWaitForSelector';
import { pageType } from './puppeteer/core/pageType';
import { pageSolveCaptcha } from './puppeteer/core/solveCaptcha';
import { pageEvaluate } from './puppeteer/core/pageEvaluate';
import { pageGoBack } from './puppeteer/core/pageGoBack';
import { pageGoForward } from './puppeteer/core/pageGoForward';
import { pageReload } from './puppeteer/core/pageReload';
import { pageAddScriptTag } from './puppeteer/core/pageAddScriptTag';
import { pageContent } from './puppeteer/core/pageContent';
import { pageCookies } from './puppeteer/core/pageCookies';
import { pageDeleteCookie } from './puppeteer/core/pageDeleteCookie';
import { pageSetCookies } from './puppeteer/core/pageSetCookies';
import { pageHover } from './puppeteer/core/pageHover';
import { pageWaitForNavigation } from './puppeteer/core/pageWaitForNavigation';
import { browserClose } from './puppeteer/core/browserClose';
import { pageClose } from './puppeteer/core/pageClose';
import { pageScreenshot } from './puppeteer/core/pageScreenshot';
import { pageChooseFile } from './puppeteer/core/pageChooseFile';
import { pageHandleTarget } from './puppeteer/core/pageHandleTarget';


export class Puppeteer implements INodeType {
	description: INodeTypeDescription = nodeDescription;

	methods = {
		loadOptions: {
			async getDevices(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const deviceNames = Object.keys(devices);
				const returnData: INodePropertyOptions[] = [];

				for (const name of deviceNames) {
					const device = (devices as any)[name];
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
		const twoCaptchaToken = this.getNodeParameter('twoCaptchaToken', 0,{}) as string;
		let returnItem: any;
		if (operation === "browserContext") {
			const options = this.getNodeParameter('browserOptions', 0,{}) as IDataObject;
			const browserAction = this.getNodeParameter('browserActions', 0,{}) as string;
			if (browserAction === "newPage") {
				const result = await startBrowser({
					instance,
					options,
					twoCaptchaToken
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
			if (browserAction === "closeBrowser") {
				const result = await browserClose({
					instance,
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

			if (pageAction === "pageScreenshot") {
				const filename = this.getNodeParameter('pageFilename', 0,{}) as string;
				const result = await pageScreenshot({
					instance,
					filename
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

			if (pageAction === "pageClick") {
				const iframe = this.getNodeParameter('iFrameSelector', 0,{}) as string;
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageClick({
					instance,
					selector,
					iframe,
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

			if (pageAction === "pageTarget") {
				const close = this.getNodeParameter('pageHandleTarget', 0,{}) as boolean;
				const timeout = this.getNodeParameter('pageGenericTimeout', 0,{}) as number;

				const result = await pageHandleTarget({
					instance,
					close,
					timeout,
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


			if (pageAction === "pageSolveCaptcha") {
				const result = await pageSolveCaptcha({
					instance
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



			if (pageAction === "pageWaitForSelector") {
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const iframe = this.getNodeParameter('iFrameSelector', 0,{}) as string;
				const result = await pageWaitForSelector({
					instance,
					selector,
					iframe,
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

			if (pageAction === "pageChooseFile") {
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const filename = this.getNodeParameter('pageFilename', 0,{}) as string;
				const result = await pageChooseFile({
					instance,
					selector,
					filename
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

			if (pageAction === "pageType") {
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const text = this.getNodeParameter('pageTypeText', 0,{}) as string;
				const iframe = this.getNodeParameter('iFrameSelector', 0,{}) as string;

				const result = await pageType({
					instance,
					selector,
					text,
					iframe,
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


			if (pageAction === "pageEvaluate") {
				const code = this.getNodeParameter('pageEvaluateFunction', 0,{}) as string;
				const args = this.getNodeParameter('evaluateArgs', 0,{}) as IDataObject;
				const iframe = this.getNodeParameter('iFrameSelector', 0,{}) as string;
				const selector = this.getNodeParameter('pageEvaluateSelector', 0,{}) as string;
				const timeout = this.getNodeParameter('pageEvaluateTimeout', 0,{}) as number;

				const result = await pageEvaluate({
					instance,
					code,
					args,
					iframe,
					selector,
					timeout
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

			if (pageAction === "pageGoBack") {
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageGoBack({
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

			if (pageAction === "pageGoForward") {
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageGoForward({
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
			if (pageAction === "pageReload") {
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageReload({
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
			if (pageAction === "pageAddScriptTag") {
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageAddScriptTag({
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
			if (pageAction === "pageContent") {
				const result = await pageContent({
					instance,
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

			if (pageAction === "pageClose") {
				const result = await pageClose({
					instance
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

			if (pageAction === "pageCookies") {
				const result = await pageCookies({
					instance,
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
			if (pageAction === "pageDeleteCookie") {
				const cookies = this.getNodeParameter('pageCookiesOptions', 0,{}) as IDataObject[];

				const result = await pageDeleteCookie({
					instance,
					cookies
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
			if (pageAction === "pageSetCookies") {
				const cookies = this.getNodeParameter('pageCookiesOptions', 0,{}) as IDataObject[];

				const result = await pageSetCookies({
					instance,
					cookies
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

			if (pageAction === "pageHover") {
				const iframe = this.getNodeParameter('iFrameSelector', 0,{}) as string;
				const selector = this.getNodeParameter('pageSelector', 0,{}) as string;
				const result = await pageHover({
					instance,
					selector,
					iframe,
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
			if (pageAction === "pageWaitForNavigation") {
				const options = this.getNodeParameter('pageOptions', 0,{}) as IDataObject;
				const result = await pageWaitForNavigation({
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
		if(returnItem){
			returnData.push(returnItem)
		}
		return this.prepareOutputData(returnData);
	}
}
