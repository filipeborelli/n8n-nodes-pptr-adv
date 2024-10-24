import { IPageType } from "./dto/interface";
import state from "../Puppeteer/utils/Cache";

export const pageType = async (data: IPageType) => {
        const { instance,selector,text, options } = data;
        await state[instance].page.type(selector,text,options);
        return {
                page: state[instance].page,
                browser: state[instance].browser
        }
}