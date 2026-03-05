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
export interface LiteraryContent {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
    author: Principal;
    timestamp: bigint;
}
export interface Comment {
    content: string;
    author: string;
    timestamp: bigint;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addComment(section: string, author: string, content: string): Promise<void>;
    addContactMessage(name: string, email: string, message: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createDraft(title: string, content: string): Promise<string>;
    deleteContent(id: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getComments(section: string): Promise<Array<Comment>>;
    getContactMessages(): Promise<Array<Message>>;
    getContentById(id: string): Promise<LiteraryContent | null>;
    getDailyVisits(day: bigint): Promise<bigint>;
    getDrafts(): Promise<Array<LiteraryContent>>;
    getPublishedContent(): Promise<Array<LiteraryContent>>;
    getTotalVisits(): Promise<bigint>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    publishContent(id: string): Promise<void>;
    recordVisit(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    unpublishContent(id: string): Promise<void>;
    updateDraft(id: string, title: string, content: string): Promise<void>;
}
