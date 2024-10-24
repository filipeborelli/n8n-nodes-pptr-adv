import { IPageWaitForSelector } from "./dto/interface";
import state from "../Puppeteer/utils/Cache";

export const pageWaitForSelector = async (data: IPageWaitForSelector) => {
        const { instance,selector, options } = data;
        await state.executions[instance].page.waitForSelector(selector,options);
        return {
                page: state.executions[instance].page,
                browser: state.executions[instance].browser
        }
        
}