import {MessageForm} from "./messagesForm";


export class UserForm{
  constructor(
    public id: string,
    public name:string,
    public BD:string,
    public email: string,
    public news: string[],
    public img: string,
    public role: string,
    public state: string,
    public messages: MessageForm[]
  ) {}
}
