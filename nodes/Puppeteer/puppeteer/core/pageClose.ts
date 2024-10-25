import { IPageClose } from "./dto/interface";
import { state } from "../state";

export const pageClose = async (data: IPageClose) => {
    const { instance } = data;
    try {
         await state[instance]?.page.close();
        return {
            status: "success",
            message: "Page closed",
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to close page"
        }
    }

}