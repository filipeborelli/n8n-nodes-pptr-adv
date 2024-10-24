export interface IStart {
    instance: string;
    options?: any
    twoCaptchaToken?: string;
}

export interface IPageGoto {
    instance: string;
    url: string;
    options?: any
}

export interface IPageSolveCaptcha {
    instance: string;
}

export interface IPageClick {
    instance: string;
    selector: string;
    options?: any
}

export interface IPageWaitForSelector {
    instance: string;
    selector: string;
    options?: any
}


export interface IPageType {
    instance: string;
    selector: string;
    text: string;
    options?: any
}