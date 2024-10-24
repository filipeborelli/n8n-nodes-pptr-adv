import { IPageType } from "./dto/interface";
import state from "../utils/Cache";

export const pageType = async (data: IPageType) => {
        const { instance,selector,text, options } = data;
        await state.executions[instance].page.type(selector,text,options);
        return {
                page: state.executions[instance].page,
                browser: state.executions[instance].browser
        }
}