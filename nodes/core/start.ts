import { IDataObject } from "n8n-workflow";
import { IStart } from "./dto/interface";
import puppeteer from "puppeteer-extra";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import { Browser, Page } from "puppeteer";
import state from "../Puppeteer/utils/Cache";

export const startBrowser = async (data: IStart) => {
        const { instance, options } = data;
        const launchArguments = (options.launchArguments as IDataObject) || {};
        const stealth = options.stealth === true;
        const launchArgs: IDataObject[] = launchArguments.args as IDataObject[];
        const args: string[] = [];
        let browser: Browser;
        let page: Page;

        if (launchArgs && launchArgs.length > 0) {
                args.push(...launchArgs.map((arg: IDataObject) => arg.arg as string));
        }

        if (options.proxyServer) {
                args.push(`--proxy-server=${options.proxyServer}`);
        }

        if (stealth) {
                puppeteer.use(pluginStealth());
        }


        if (options.browserWSEndpoint) {
                browser = await puppeteer.connect({
                        browserWSEndpoint: options.browserWSEndpoint,
                        ignoreHTTPSErrors: true,
                });
        } else {
                browser = await puppeteer.launch({
                        headless: true,
                        args,
                        ignoreHTTPSErrors: true,
                });
        }

        page = await browser.newPage();
        state[instance].page = page;
        state[instance].browser = browser;
        return {
                browser,
                page,
        }
}