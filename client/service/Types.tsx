export type PostEchoBoardData = {
  title: string;
  content: string;
  author: string;
  anonymous: boolean;
};

export type EchoBoardResponseData = {
  id: string;
  title: string;
  content: string;
  author: string;
  anonymous: boolean;
  upvote: number;
  created: string;
  echoBoardComments: CommentResponseData[];
  echoBoardSolutions: SolutionResponseData[];
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
};

export type UserResponseData = {
  subject: string;
  name: string; 
  email: string;
  picture: string;
  //add later: 
  //comments[]
  //posts[]
  //solutions[]
  //upvotes? 
}
