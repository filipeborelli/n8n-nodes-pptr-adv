import { IPageType } from "./dto/interface";
import { state } from "../state";

export const pageType = async (data: IPageType) => {
        const { instance, selector, text, options } = data;
        try {
                await state[instance]?.page.type(selector, text, options);
                return {
                        status: "success",
                        message: "Text typed in the selector"
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error to type in the selector"
                }
        }
}