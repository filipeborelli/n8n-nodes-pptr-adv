import { IPageType } from "./dto/interface";
import { state } from "../state";

export const pageType = async (data: IPageType) => {
        const { instance, selector, text, options ,iframe} = data;
        try {
                if(iframe){
                        const frameElement = await state[instance]?.page.$(iframe);
                        if (!frameElement) {
                                return {
                                        error: "Error to find the iframe element"
                                }
                        }
                        const frame = await frameElement.contentFrame();
                        if (!frame) {
                                return {
                                        error: "Error to find the iframe"
                                }
                        }

                        const response = await frame.type(selector, text, options);

                        if (response?.error) {
                                return {
                                        error: response?.error || "Error to type in the selector"
                                }
                        }
                        return {
                                status: "success",
                                message: "Text typed in the selector"
                        }
                }else{
                        const response = await state[instance]?.page.type(selector, text, options);
                        if(response?.error){
                                return {
                                        error: response?.error || "Error to type in the selector"
                                }
                        }

                        return {
                                status: "success",
                                message: "Text typed in the selector"
                        }
                }
    
        } catch (error: any) {
                return {
                        error: error?.message || "Error to type in the selector"
                }
        }
}