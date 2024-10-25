import { IPageCookies } from "./dto/interface";
import { state } from "../state";

export const pageCookies = async (data: IPageCookies) => {
    const { instance } = data;
    try {
        const response = await state[instance]?.page.cookies();
        return {
            status: "success",
            message: "Cookies",
            cookies: response
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to get the cookies"
        }
    }

}