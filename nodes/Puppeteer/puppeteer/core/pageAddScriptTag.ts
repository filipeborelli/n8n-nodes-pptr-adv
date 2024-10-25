import { IPageAddScriptTag } from "./dto/interface";
import { state } from "../state";

export const pageAddScriptTag = async (data: IPageAddScriptTag) => {
    const { instance, options } = data;
    try {
        await state[instance]?.page.addScriptTag(options);
        return {
            status: "success",
            message: "Script tag added"
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error to add script tag"
        }
    }

}