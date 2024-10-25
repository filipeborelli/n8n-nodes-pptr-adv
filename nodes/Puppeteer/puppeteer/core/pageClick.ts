import { IPageClick } from "./dto/interface";
import { state } from "../state";

export const pageClick = async (data: IPageClick) => {
        const { instance, selector } = data;
        try {
                console.log(selector,"meu seletor")
                await state[instance]?.page.click(selector);
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