export type PostEchoBoardData = {
    title: string;
    content: string;
    author: string;
  };

export type EchoBoardResponseData = {
    id: string,
    title: string,
    content: string,
    author: string,
    upvote: number,
    created: string,
    comments: CommentResponseData[]
}

export type CommentResponseData = {
    id: string,
    author: string,
    comment: string,
    upvote: number,
    created: string
}
