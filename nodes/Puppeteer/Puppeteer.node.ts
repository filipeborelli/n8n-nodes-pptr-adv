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
import { AddOutputPort } from './actions/OutputPorts';

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
		const handleBrowserClose = this.getNodeParameter('handleBrowserClose', 0) as boolean;
		const handleBrowserInfos = this.getNode().name;
		console.log(handleBrowserClose, "handleBrowserClose",handleBrowserInfos)
		// Se o handleBrowserClose estiver ativado, chama addOutputPort
		if (handleBrowserClose) {
			 AddOutputPort(handleBrowserClose)
		}
		const returnData: IDataObject[] = [];
		return [this.helpers.returnJsonArray(returnData)];
		
	}
}
