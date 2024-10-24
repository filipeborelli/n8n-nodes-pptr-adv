import { IPageWaitForSelector } from "./dto/interface";
import { state } from "../state";

export const pageWaitForSelector = async (data: IPageWaitForSelector) => {
        const { instance, selector, options } = data;
        try {
                await state[instance]?.page.waitForSelector(selector, options);
                return {
                        status: "success",
                        message: "Selector found"
                }
        } catch (error:any) {
                return {
                        status: "error",
                        error: error?.message || "Error to wait for selector"
                }
        }

}