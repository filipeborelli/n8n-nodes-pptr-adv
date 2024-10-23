import { INodeParameters, NodeConnectionType } from "n8n-workflow";

export const configuredOutputs = (parameters: INodeParameters) => {
    const hasBrowserOptions : any = parameters.browserOptions;
    const outputs: any = ["main"]
    if(hasBrowserOptions.handleBrowserClose) {
        outputs.push({
            type: `${NodeConnectionType.Main}`,
            displayName: "Close Browser",
        })
    }
	return outputs;
};
