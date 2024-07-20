export interface IBook {
    "title": string,
    "author": string,
    "description": string,
    "summary": string,
    "publicationDate": string
}
export interface IBooksResponse {
    message: string;
    data:    Record<string,string>;
}

export interface IBooksLoadResponse {
    message: string;
    data:    IBookData[];
}

export interface IBookData {
    id:              string;
    title:           string;
    author:          string;
    description:     string;
    summary:         string;
    publicationDate: Date;
    createdBy:       string;
    updatedBy:       null;
    deletedBy:       null;
    createdAt:       Date;
    updatedAt:       Date;
    deletedAt:       null;
    files:           any[];
}