export interface IStart {
    instance: string;
    options?: any
}

export interface IPageGoto {
    instance: string;
    url: string;
    options?: any
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