export class PostEchoError extends Error {
  constructor(message = "Error posting to Echo Board.") {
    super(message);
    this.name = "PostEchoError";
  }
}

export class FetchEchoBoardsError extends Error {
  constructor(message = "Error fetching Echos.") {
    super(message);
    this.name = "FetchEchoBoardsError";
  }
}






















































































