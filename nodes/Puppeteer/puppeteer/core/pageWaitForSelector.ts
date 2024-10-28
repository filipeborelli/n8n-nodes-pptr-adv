import { IPageWaitForSelector } from "./dto/interface";
import { state } from "../state";

export const pageWaitForSelector = async (data: IPageWaitForSelector) => {
        const { instance, selector, options, iframe } = data;
        try {
                if (iframe) {
                        const frameElement = await state[instance]?.page.$(iframe);
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

                        await frame.waitForSelector(selector, options);
                        return {
                                status: "success",
                                message: "Clicked in the selector"
                        }
                } else {
                        await state[instance]?.page.waitForSelector(selector, options);

                        return {
                                status: "success",
                                message: "Selector found"
                        }
                }
        } catch (error: any) {
                return {
                        status: "error",
                        error: error?.message || "Error to wait for selector"
                }
        }

}
