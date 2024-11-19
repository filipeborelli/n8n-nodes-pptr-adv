import { IPageHandleTarget } from "./dto/interface";
import { state } from "../state";

export const pageHandleTarget = async (data: IPageHandleTarget) => {
	const { close, instance } = data;
	try {
		var page = state[instance]?.page
		var browser = state[instance]?.browser

		const [target]: any = await Promise.all([
			await new Promise((resolve) => browser.once("targetcreated", resolve)),
		]);
		const urlTarget = await target.url();
		await page.bringToFront();
		const [response] = await page.goto(urlTarget);
		if(close){
			await target.page().close();
		}
		if (response?.error) {
			return {
				error: response?.error || "Error to go to the target"
			}
		}

		return {
			status: "success",
			message: "Target handled"
		}

	} catch (error: any) {
		return {
			error: error?.message || "Error to handle the target"
		}
	}
}
