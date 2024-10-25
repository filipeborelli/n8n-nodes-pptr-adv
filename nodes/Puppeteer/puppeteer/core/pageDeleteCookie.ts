import { IPageDeleteCookie } from "./dto/interface";
import { state } from "../state";

export const pageDeleteCookie = async (data: IPageDeleteCookie) => {
    const { instance, cookies } = data;
    try {
        const response = await state[instance]?.page.deleteCookie(cookies);
        return {
            status: "success",
            message: "Cookies deleted",
            cookies: response
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to delete cookies"
        }
    }

}