export type PostEchoBoardData = {
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
};

export type EchoBoardResponseData = {
  id: string;
  title: string;
  content: string;
  author: string;
  isAnonymous: boolean;
  upvote: number;
  created: string;
  echoBoardComment: CommentResponseData[];
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
  id: number;
  name: string; 
  email: string;
  //add later: 
  //comments[]
  //posts[]
  //solutions[]
  //upvotes? 
}