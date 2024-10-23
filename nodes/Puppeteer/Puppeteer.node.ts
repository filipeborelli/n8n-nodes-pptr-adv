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
import { OutPutPorts } from './utils/Cache';

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
			async handleOutputPorts(this: ILoadOptionsFunctions): Promise<any> {
				const browserOptions = this.getNodeParameter('browserOptions', 0,{}) as IDataObject;
				if (browserOptions.handleBrowserClose) {
					OutPutPorts.push({
						name: "On browser close",
						value: "onBrowserClose",
						description: "Triggered when the browser closes",
					})
				}else{
					const findPort = OutPutPorts.find((port: any)=> port?.value === "onBrowserClose");
					if(findPort){
						OutPutPorts.splice(OutPutPorts.indexOf(findPort), 1);
					}
				}
			},
		},
		
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const returnData: IDataObject[] = [];
		return [this.helpers.returnJsonArray(returnData)];
		
	}
}
