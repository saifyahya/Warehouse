import { Store } from "./store.model";

export interface User{
    name:string;
    dob: Date,
    email: string,
    userName: string,
    phoneNumber: string
    store?:Store
}