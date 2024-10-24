import { IPageClick } from "./dto/interface";
import state from "../Puppeteer/utils/Cache";

export const pageClick = async (data: IPageClick) => {
        const { instance,selector, options } = data;
        await state[instance].page.click(selector,options);
        return {
                page: state[instance].page,
                browser: state[instance].browser
        }
}