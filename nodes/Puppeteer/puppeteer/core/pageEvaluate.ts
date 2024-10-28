import { IPageEvaluate } from "./dto/interface";
import { state } from "../state";

export const pageEvaluate = async (data: IPageEvaluate) => {
        const { instance, code, args, iframe, selector, timeout } = data;
				const t0 = Math.floor(Date.now() / 1000)

        try {
								var page = state[instance]?.page
								if (iframe) {
										const frameElement = await page.$(iframe)
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
										page = frame
								}


								if (selector){
										while(true){	//Loop until evaluation or timeout
											try {
												const response = await page.$eval(selector, new Function(code));

												if (response ){
													return {
																	status: "success",
																	message: "Successfully evaluated the selector",
																	response
													}
												}
												else if (timeout && Math.floor(Date.now() / 1000)-t0 > timeout) {
													return {
														status: "timeout",
														message: "Timed out when waiting for the evaluation"
													}
												}
											}
											catch (error: any) { } //Selector not ready yet, wait

											//sleep
											await new Promise(resolve => setTimeout(resolve, 500));

									}

								}
								else {
										const response = await page.evaluate((code: any,args: any)=>{
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
