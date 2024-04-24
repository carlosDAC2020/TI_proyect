export class ItemRss {
    id?: number;
    type:string="rss";
    page?: string;
    datePub?: string;
    title?:string;
    autor?:string;
    interctions?:number;
    bodyText?:string;
}

export class ItemReddit {
    id?: number;
    type:string="reddit";
    datePub?: string;
    nameProfile?: string;
    titlePub?: string;
    textPub?: string;
    CantUpVotes?: number;
    CantDownVotes?: number;
    CantShares?: number;
}

export class ItemX{
    id?:number;
    type:string="x";
    datePub?:string;
    userPorifle?:string;
    nameProfile?:string;
    textPub?:string;
    cantLkes?:number;
    canRetwits?:number;
    cantComents?:number;
}

