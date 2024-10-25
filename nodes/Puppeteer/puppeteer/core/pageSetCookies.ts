import { IPageSetCookies } from "./dto/interface";
import { state } from "../state";

export const pageSetCookies = async (data: IPageSetCookies) => {
    const { instance, cookies } = data;
    try {

        console.log(cookies,"meus cookies",cookies[0]?.name,...cookies)
        const cookiesParsed = JSON.parse(cookies)
        console.log(cookiesParsed,"meus cookies parsed",cookiesParsed[0]?.name,...cookiesParsed)
        const response = await state[instance]?.page.setCookie(...cookiesParsed);
        return {
            status: "success",
            message: "Cookies successfully set",
            cookies: response,
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to set cookies"
        }
    }

}