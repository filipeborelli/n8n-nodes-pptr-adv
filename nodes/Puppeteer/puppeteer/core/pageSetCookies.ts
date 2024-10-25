import { IPageSetCookies } from "./dto/interface";
import { state } from "../state";

export const pageSetCookies = async (data: IPageSetCookies) => {
    const { instance, cookies } = data;
    try {
        console.log(cookies,"meus cookies")
        const response = await state[instance]?.page.setCookie(...cookies);
        return {
            status: "success",
            message: "Cookies successfully set",
            cookies: response
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to set cookies"
        }
    }

}