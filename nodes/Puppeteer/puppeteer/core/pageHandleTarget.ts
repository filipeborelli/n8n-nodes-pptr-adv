import { IPageHandleTarget } from "./dto/interface";
import { state } from "../state";

export const pageHandleTarget = async (data: IPageHandleTarget) => {
	const { close, instance ,timeout} = data;
	try {
		var page = state[instance]?.page
		var browser = state[instance]?.browser
		let time = timeout || 10000;
		const timeoutFunc = setTimeout(async () => {
			await page.close();
			throw new Error("Timeout to handle the target");
		}, time);
		const [target]: any = await Promise.all([
			await new Promise((resolve) => browser.once("targetcreated", resolve)),
		]);
		const urlTarget = await target.url();
		if(close){
			await target.close();
		}
		const [response] = await page.goto(urlTarget);

		if (response?.error) {
			return {
				error: response?.error || "Error to go to the target"
			}
		}
		clearTimeout(timeoutFunc);
		return {
			status: "success",
			message: "Target handled",
			url: urlTarget
		}

	} catch (error: any) {
		return {
			error: error?.message || "Error to handle the target"
		}
	}
}
