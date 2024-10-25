import { IPageGoBack } from "./dto/interface";
import { state } from "../state";

export const pageGoBack = async (data: IPageGoBack) => {
        const { instance,options } = data;
        try {
                await state[instance]?.page.goBack(options)
             
                return {
                        status: "success",
                        message: "Navigate to the previous page"
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error to navigate to the previous page"
                }
        }
}       