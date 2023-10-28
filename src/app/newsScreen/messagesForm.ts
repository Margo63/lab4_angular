export class SubMessageForm{
  constructor(
    public time : string,
    public text: string
  ) {}
}
export class MessageForm{
  constructor(
    public flag:boolean,
    public from: string,
    public message: SubMessageForm[]
  ) {}
}
