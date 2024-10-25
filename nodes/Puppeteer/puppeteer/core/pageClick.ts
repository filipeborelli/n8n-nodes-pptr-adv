import { IPageClick } from "./dto/interface";
import { state } from "../state";

export const pageClick = async (data: IPageClick) => {
        const { instance, selector, options, iframe } = data;
        try {
                if (iframe) {
                        const frameElement = state[instance]?.page.$(iframe);
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

                        const [response] = await Promise.all([
                                frame.waitForNavigation(),
                                frame.click(selector, options),
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

                } else {
                        const [response] = await Promise.all([
                                state[instance]?.page.waitForNavigation(),
                                state[instance]?.page.click(selector, options),
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
                }

        } catch (error: any) {
                return {
                        error: error?.message || "Error to click in the selector"
                }
        }
}       