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
    data:    Record<string,string>;
}

export interface IDataUser {
    name:      string;
    lastName:  string;
    email:     string;
    password: string
}