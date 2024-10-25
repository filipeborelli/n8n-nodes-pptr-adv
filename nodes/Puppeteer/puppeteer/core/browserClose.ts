import { IBrowserClose } from "./dto/interface";
import { state } from "../state";

export const browserClose = async (data: IBrowserClose) => {
    const { instance } = data;
    try {
         await state[instance]?.browser.close();
        return {
            status: "success",
            message: "Browser closed",
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to close browser"
        }
    }

}