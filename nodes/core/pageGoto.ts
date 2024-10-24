import { IPageGoto } from "./dto/interface";
import state from "../Puppeteer/utils/Cache";

export const pageGoto = async (data: IPageGoto) => {
        const { instance, options } = data;
        await state[instance].page.goto(options.url);
        return {
                page: state[instance].page,
                browser: state[instance].browser
        }
}