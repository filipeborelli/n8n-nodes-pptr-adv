import { IPageReload } from "./dto/interface";
import { state } from "../state";

export const pageReload = async (data: IPageReload) => {
        const { instance,options } = data;
        try {
                await state[instance]?.page.reload(options)
             
                return {
                        status: "success",
                        message: "Page reloaded successfully"
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error reloading the page",
                }
        }
}       