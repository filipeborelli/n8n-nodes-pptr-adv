import { IPageHover } from "./dto/interface";
import { state } from "../state";

export const pageHover = async (data: IPageHover) => {
        const { instance, selector, iframe } = data;
        try {
                if (iframe) {
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

                        const [response] = await Promise.all([
                                frame.waitForNavigation(),
                                frame.hover(selector),
                        ]);
                        if (response?.error) {
                                return {
                                        error: response?.error || "Error to hover in the selector"
                                }
                        }
                        return {
                                status: "success",
                                message: "Hover in the selector"
                        }

                } else {

										try {	//Manual hover that works with Shadow DOM
											const el = await state[instance]?.page.$(selector)
											const boundingBox = await el.boundingBox()
											const x = boundingBox.x + boundingBox.width/2
											const y = boundingBox.y + boundingBox.height/2
											await state[instance]?.page.mouse.move(x, y)

										}
										catch {
											return {
												error: "Error when hovering on selector"
											}
										}
										//detect hover here (How?)

                        /*const [response] = await Promise.all([
                                //state[instance]?.page.waitForNavigation(),
                                //state[instance]?.page.hover(selector),

                        ]);*/
                        /*if (response?.error) {
                                return {
                                        error: response?.error || "Error to hover in the selector"
                                }
                        }*/
                        return {
                                status: "success",
                                message: "Hover in the selector"
                        }
                }

        } catch (error: any) {
                return {
                        error: error?.message || "Error to hover in the selector"
                }
        }
}
