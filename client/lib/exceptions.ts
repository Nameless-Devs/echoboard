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

export class UpvoteError extends Error {
  constructor(message = "Error Upvoting.") {
    super(message);
    this.name = "UpvotePostError";
  }
}

export class FetchEchoBoardByIdError extends Error {
  constructor(message = "Error fetching users Echos.") {
    super(message);
    this.name = "FetchEchoBoardByIdError";
  }
}

export class PostCommentError extends Error {
  constructor(message = "Error posting comment.") {
    super(message);
    this.name = "PostCommentError";
  }
}

export class PostSolutionError extends Error {
  constructor(message = "Error posting solution.") {
    super(message);
    this.name = "PostSolutionError";
  }
}

export class GettingUserInfoError extends Error {
  constructor(message = "Error Fetching User Info.") {
    super(message);
    this.name = "GettingUserInfoError";
  }
}

export class VolunteerForSolutionError extends Error {
  constructor(message = "Error Volunteer For Solution.") {
    super(message);
    this.name = "VolunteerForSolutionError";
  }
}

export class FetchChatRoomHistoryError extends Error {
  constructor(message = "Error fetching chatroom history.") {
    super(message);
    this.name = "FetchChatRoomHistoryError";
  }
}


export class DeletingEchoBoardError extends Error {
  constructor(message = "Error deleting Echo.") {
    super(message);
    this.name = "DeletingEchoBoardError";
  }
}

export class EditingEchoBoardError extends Error {
  constructor(message = "Error editing Echo.") {
    super(message);
    this.name = "EditingEchoBoardError";
  }
}




















































































