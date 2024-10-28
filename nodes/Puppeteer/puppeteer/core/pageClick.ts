import { IPageClick } from "./dto/interface";
import { state } from "../state";

export const pageClick = async (data: IPageClick) => {
        const { instance, selector, options, iframe } = data;
        try {
								var page = state[instance]?.page
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

								const [response] = await Promise.all([
										page.waitForNavigation(options),
										page.click(selector, options)
								]);
								if (response?.error) {
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
