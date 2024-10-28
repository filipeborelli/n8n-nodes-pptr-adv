import { IPageScreenshot } from "./dto/interface";
import { state } from "../state";

export const pageScreenshot = async (data: IPageScreenshot) => {
    const { instance, filename } = data;
    try {
         await state[instance]?.page.screenshot({path:filename});
        return {
            status: "success",
            message: `Screenshot saved to ${filename}!`,
        }
    } catch (error: any) {
        return {
            error: error?.message || "Error in screenshotting page"
        }
    }

}
