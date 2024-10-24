import { Browser, Page } from "puppeteer";


const state: {
	executions: {
		[key: string]: {
			browser: Browser;
			page: Page;
		};
	};
} = {
	executions: {},
};

export default state;
