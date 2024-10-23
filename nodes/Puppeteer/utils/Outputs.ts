import { INodeParameters, NodeConnectionType } from "n8n-workflow";

export const configuredOutputs = (parameters: INodeParameters) => {
    const hasBrowserOptions : any = parameters.browserOptions;
    const outputs: any = [{
        type: `${NodeConnectionType.Main}`,
        displayName: "Next"
    }]
    if(hasBrowserOptions.handleBrowserClose) {
        outputs.push({
            type: `${NodeConnectionType.Main}`,
            displayName: "Close Browser",
            category: "error"
        })
    }
    if(hasBrowserOptions.handleBrowserDisconnect) {
        outputs.push({
            type: `${NodeConnectionType.Main}`,
            displayName: "Browser Disconnected",
            category: "error"
        })
    }
    if(hasBrowserOptions.handleTarget) {
        outputs.push({
            type: `${NodeConnectionType.Main}`,
            displayName: "Target"
        })
    }
	return outputs;
};
