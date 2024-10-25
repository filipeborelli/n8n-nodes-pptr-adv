import { IPageClick } from "./dto/interface";
import { state } from "../state";

export const pageClick = async (data: IPageClick) => {
        const { instance, selector,options } = data;
        try {
                const [response] = await Promise.all([
                        state[instance]?.page.waitForNavigation(),
                        state[instance]?.page.click(selector, options),
                      ]);
                 if(response?.error){
                        return {
                                error: response?.error || "Error to click in the selector"
                        }
                }     
                return {
                        status: "success",
                        message: "Clicked in the selector"
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error to click in the selector"
                }
        }
}       