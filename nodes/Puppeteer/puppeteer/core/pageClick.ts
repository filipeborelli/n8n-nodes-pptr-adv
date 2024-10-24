import { IPageClick } from "./dto/interface";
import state from "../utils/Cache";

export const pageClick = async (data: IPageClick) => {
        const { instance,selector, options } = data;
        await state.executions[instance].page.click(selector,options);
        return {
                page: state.executions[instance].page,
                browser: state.executions[instance].browser
        }
}