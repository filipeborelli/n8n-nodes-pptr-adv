import { IPageWaitForNavigation } from "./dto/interface";
import { state } from "../state";

export const pageWaitForNavigation = async (data: IPageWaitForNavigation) => {
        const { instance, options } = data;
        try {
                await state[instance]?.page.waitForNavigation(options);
                return {
                        status: "success",
                        message: "Wait for navigation"
                }

        } catch (error: any) {
                return {
                        status: "error",
                        error: error?.message || "Error to wait for navigation"
                }
        }

}