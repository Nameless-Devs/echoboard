export type PostEchoBoardData = {
  title: string;
  content: string;
  author: string;
  anonymous: boolean;
};

export type EchoBoardUser = {
  name: string;
  picture: string;
}

export type EchoBoardResponseData = {
  id: string;
  title: string;
  content: string;
  anonymous: boolean;
  upvote: string[];
  created: string;
  echoBoardComments: CommentResponseData[];
  echoBoardSolutions: SolutionResponseData[];
  echoBoardUser: EchoBoardUser;
};

export type CommentResponseData = {
  id: string;
  content: string;
  upvote: string[];
  created: string;
  echoBoardUser: EchoBoardUser;
};

export type UpvoteProps = {
  upvote: string[];
  echoBoardId: string;
};

export type CommentToPost = {
  author: string;
  content: string;
}

export type SolutionToPost = {
  author: string;
  content: string;
}

export type SolutionResponseData = {
  id: string;
  content: string;
  upvote: string[];
  created: string;
  status: string;
  echoBoardUser: EchoBoardUser;
};

export type UserResponseData = {
  name: string;
  picture: string;
  //add later: 
  //comments[]
  //posts[]
  //solutions[]
  //upvotes? 
}

export type StatusInfo = {
  formattedStatus: string;
  color: string;
}
