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

export type CommentOrSolutionType = {
  id: string;
  content: string;
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
  subject: string;
  name: string;
  picture: string;
  echoBoardComments: CommentResponseData[];
  echoBoardSolutions: SolutionResponseData[];
  echoBoards: EchoBoardResponseData[];
  pendingVolunteeredSolutions: SolutionResponseData[];
  volunteeredSolutions: SolutionResponseData[];
}

export type StatusInfo = {
  formattedStatus: string;
  color: string;
}

export interface Message {
  id?: number;
  sender: string;
  picture: string;
  content: string;
}

export type EchoBoardPreviewResponseData = {
  id: string;
  title: string;
  anonymous: boolean;
  echoBoardUser: EchoBoardUser;
}

export type SolutionVolunteersResponseData = {
  id: string; 
  volunteers: UserResponseData[];
  pendingVolunteers: UserResponseData[];
}

export type ChatRoomResponse = {
  id: number;
  title: string;
}