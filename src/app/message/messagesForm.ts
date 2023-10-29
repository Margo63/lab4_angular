
export class MessageForm{
  constructor(
    public from: string,
    public to: string,
    public time: string,
    public message: string,
    public date: string
  ) {}
}
