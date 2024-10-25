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



export interface IPageAddScriptTag {
    instance: string;
    options?: any
}


export interface IPageContent {
    instance: string;
}



export interface IPageCookies {
    instance: string;
}


export interface IPageDeleteCookie {
    instance: string;
    cookies: any;
}


export interface IPageSetCookies {
    instance: string;
    cookies: any;
}


export interface IPageSolveCaptcha {
    instance: string;
}

export interface IPageClick {
    instance: string;
    selector: string;
    iframe?: string;
    options?: any
}

export interface IPageHover {
    instance: string;
    selector: string;
    iframe?: string;
}


export interface IPageGoBack {
    instance: string;
    options?: any
}


export interface IPageGoForward {
    instance: string;
    options?: any
}


export interface IPageReload {
    instance: string;
    options?: any
}

export interface IPageEvaluate {
    instance: string;
    code: any;
    args?: any;
    iframe?: string;
}


export interface IPageWaitForSelector {
    instance: string;
    selector: string;
    iframe?: string;
    options?: any
}



export interface IPageWaitForNavigation {
    instance: string;
    options?: any
}

export interface IPageType {
    instance: string;
    selector: string;
    text: string;
    iframe?: string;
    options?: any
}

export interface IPageClose {
    instance: string;
}

export interface IBrowserClose {
    instance: string;
}