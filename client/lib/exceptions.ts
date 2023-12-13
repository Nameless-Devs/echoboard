export class PostEchoError extends Error {
  constructor(message = "Error posting to Echo Board.") {
    super(message);
    this.name = "PostEchoError";
  }
}
