import { IPageWaitForSelector } from "./dto/interface";
import state from "../Puppeteer/utils/Cache";

export const pageWaitForSelector = async (data: IPageWaitForSelector) => {
        const { instance,selector, options } = data;
        await state[instance].page.waitForSelector(selector,options);
        return {
                page: state[instance].page,
                browser: state[instance].browser
        }
}