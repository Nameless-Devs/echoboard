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
  upvote: number;
  created: string;
  echoBoardComments: CommentResponseData[];
  echoBoardSolutions: SolutionResponseData[];
  echoBoardUser: EchoBoardUser;
};

export type CommentResponseData = {
  id: string;
  author: string;
  content: string;
  upvote: number;
  created: string;
};

export type UpvoteProps = {
  upvote: number;
  echoBoardId: string;
};
 export type CommentToPost = {
  author: string; 
  content: string;
 }

 //Solution types are the same as Comment types for now, but that will be changed
 //once we introduce enum labels for solutions
 export type SolutionToPost = {
  author: string; 
  content: string;
 }
 export type SolutionResponseData = {
  id: string;
  author: string;
  content: string;
  upvote: number;
  created: string;
  status: string;
};

export type UserResponseData = {
  name: string; 
  email: string;
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
