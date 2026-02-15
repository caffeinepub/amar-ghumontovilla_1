import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Comment {
    content: string;
    author: string;
    timestamp: bigint;
}
export interface backendInterface {
    addContactMessage(name: string, email: string, message: string): Promise<void>;
    addEssaysComment(author: string, content: string): Promise<void>;
    addHomeComment(author: string, content: string): Promise<void>;
    addPoemsComment(author: string, content: string): Promise<void>;
    addStoriesComment(author: string, content: string): Promise<void>;
    getContactMessages(): Promise<Array<Message>>;
    getEssaysComments(): Promise<Array<Comment>>;
    getHomeComments(): Promise<Array<Comment>>;
    getPoemsComments(): Promise<Array<Comment>>;
    getStoriesComments(): Promise<Array<Comment>>;
}
