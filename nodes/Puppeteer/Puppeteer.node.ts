import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	ILoadOptionsFunctions,
	INodePropertyOptions,
	ConnectionTypes,
	INodeOutputConfiguration,
	ExpressionString,
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
			async addOutputPort(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const nodeInfos = this.getNodeParameter('handleBrowserClose', 0) as IDataObject;
				console.log(nodeInfos, "minhas infos");
				const returnData: INodePropertyOptions[] = [];
				OutPutPorts.push({
					type: "main",
					category: "error",
					displayName: "On browser close",
				});
				return returnData;
			}
			
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		const returnData: IDataObject[] = [];
		return [this.helpers.returnJsonArray(returnData)];
		
	}
}
