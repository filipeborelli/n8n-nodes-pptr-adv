import { IPageSolveCaptcha } from "./dto/interface";
import { state } from "../state";

export const pageSolveCaptcha = async (data: IPageSolveCaptcha) => {
        const { instance } = data;
        try {
                const result: any = await state[instance]?.solveRecaptchas()
                await Promise.all([
                        state[instance]?.page.waitForNavigation(),
                        state[instance]?.page.click(`#recaptcha-demo-submit`)
                ])

                if(result?.error){
                        return {
                                error: result?.error || "Error to solve captcha"
                        }
                }

                if(result?.solved){
                        return {
                                status: "Solved",
                                solved: true
                        }
                }
        } catch (error: any) {
                return {
                        error: error?.message || "Error to solve captcha"
                }
        }
}