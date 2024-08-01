export interface Diary {
    id: number;
    date: string;
    weather: string;
    visibility: string;
}

export interface ValidationError {
    message: string;
    errors: Record<string, string[]>
  }

export interface Message {
    msg: string;
    types: Types;
}

export type Types = 'error' | 'update'