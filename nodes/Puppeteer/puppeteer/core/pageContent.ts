import { IPageContent } from "./dto/interface";
import { state } from "../state";

export const pageContent = async (data: IPageContent) => {
    const { instance } = data;
    try {
        const response = await state[instance]?.page.content();
        return {
            status: "success",
            message: "Page content",
            html: response
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to get page content"
        }
    }

}