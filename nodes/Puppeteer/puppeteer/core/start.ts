import { IDataObject } from "n8n-workflow";
import { IStart } from "./dto/interface";
import puppeteer from "puppeteer-extra";
import pluginStealth from "puppeteer-extra-plugin-stealth";
import { Browser } from "puppeteer";
import { state } from "../utils/Cache";

export const startBrowser = async (data: IStart) => {
        const { instance, options } = data;
        const launchArguments = (options.launchArguments as IDataObject) || {};
        const stealth = options.stealth === true;
        const launchArgs: IDataObject[] = launchArguments.args as IDataObject[];
        const args: string[] = [];
        let browser: Browser;


        if (launchArgs && launchArgs.length > 0) {
                args.push(...launchArgs.map((arg: IDataObject) => arg.arg as string));
        }

        if (options.proxyServer) {
                args.push(`--proxy-server=${options.proxyServer}`);
        }
        try {
                if (stealth) {
                        puppeteer.use(pluginStealth());
                }

        } catch (error) {
                return {
                        error: "Error to use pluginStealth"
                }
        }


        if (options.browserWSEndpoint) {
                try {
                        browser = await puppeteer.connect({
                                browserWSEndpoint: options.browserWSEndpoint,
                                ignoreHTTPSErrors: true,
                        });
                } catch (error: any) {
                        return {
                                error: error?.message || "Error to connect to browser"
                        }
                }
        } else {
                try {
                        browser = await puppeteer.launch({
                                headless: true,
                                args,
                                ignoreHTTPSErrors: true,
                        });
                } catch (error: any) {
                        return {
                                error: error?.message || "Error to launch to browser"
                        }
                }
        }

        try {
                await browser.newPage();
        } catch (error: any) {
                return {
                        error: error?.message || "Error to create new page"
                }
        }

        return {
                instance,
                state: state ? state : "Meu state",
                status: "success",
                message: "Browser started successfully"
        }
}