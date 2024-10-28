import { IPageGoForward } from "./dto/interface";
import { state } from "../state";

export const pageGoForward = async (data: IPageGoForward) => {
        const { instance,options } = data;
        try {
                await state[instance]?.page.goForward(options)

                return {
                        status: "success",
                        message: "Navigate to the next page"
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error to navigate to the next page"
                }
        }
}
