import { IPageClick } from "./dto/interface";
import { state } from "../state";

export const pageClick = async (data: IPageClick) => {
	const { instance, selector, options, iframe } = data;
	try {
		var page = state[instance]?.page
		const timeout = options?.timeout || 10000;

		if (iframe) {
			const frameElement = await page.$(iframe)
			if (!frameElement) {
				return {
					error: "Error to find the iframe element"
				}
			}
			const frame = await frameElement.contentFrame();
			if (!frame) {
				return {
					error: "Error to find the iframe"
				}
			}
			page = frame
		}

		const [response, waitNavigation] = await Promise.all([
			page.click(selector, options),
			page.waitForNavigation({
				waitUntil: "domcontentloaded",
				timeout: timeout
			})
		]);
		if (response?.error || waitNavigation?.error) {
			return {
				error: response?.error || "Error to click in the selector"
			}
		}
	
		return {
			status: "success",
			message: "Clicked in the selector"
		}

	} catch (error: any) {
		return {
			error: error?.message || "Error to click in the selector"
		}
	}
}
