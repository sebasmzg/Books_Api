/* I Users */
export interface IBodyRequestLogin {
    email:	string
    password:	string
}

export interface IBodyResponseLogin{
    message: string
    data: Record<string, string>
}

export interface IBodyResponseUser {
    message: string;
    data:    IDataUser;
}

export interface IDataUser {
    name:      string;
    lastName:  string;
    email:     string;
    password: string
}
/* I Books */

export interface ICreateBook {
    title: string
    author: string
    description: string
    summary: string
    publicationDate: string
}
