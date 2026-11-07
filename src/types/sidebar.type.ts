

export interface SidbareItem {
    title: string;
    url: string;
}

export interface SidbareGroup {
    title: string;
    items: SidbareItem[];
}

export type SidbareItems = SidbareGroup[];