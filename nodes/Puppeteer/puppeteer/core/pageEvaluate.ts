import { IPageEvaluate } from "./dto/interface";
import { state } from "../state";

export const pageEvaluate = async (data: IPageEvaluate) => {
        const { instance, code, args, iframe } = data;
        try {
                if (iframe) {
                        const frameElement = state[instance]?.page.$(iframe);
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

                        const response = await frame.evaluate((code: any,args: any)=>{
                              const func = new Function(code)
                              return func(args)
                        },code,args);
                      
                        return {
                                status: "success",
                                message: "Successfully evaluated the selector",
                                response
                        }

                } else {
                        const response = await state[instance]?.page.evaluate((code: any,args: any)=>{
                              const func = new Function(code)
                              return func(args)
                        },code,args);
                        
                        return {
                                status: "success",
                                message: "Successfully evaluated the selector",
                                response
                        }
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error evaluating the selector",
                }
        }
}       