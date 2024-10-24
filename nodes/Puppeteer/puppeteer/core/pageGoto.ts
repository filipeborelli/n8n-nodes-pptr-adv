import { IPageGoto } from "./dto/interface";
import { state } from "../utils/Cache";

export const pageGoto = async (data: IPageGoto) => {
        const { instance, options, url } = data;
        const urlParam = new URL(url);
        console.log(options,"minhas options aqui")
        const response = await state[instance]?.page.goto(urlParam.toString(),options);
        const headers = response?.headers();
        const statusCode = response?.status();
        return {
                headers,
                statusCode
        }
}