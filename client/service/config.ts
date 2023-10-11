export const ENDPOINTS = {
  POST_ECHO: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes`,
  UPVOTE_POST: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/upvote`,
  UPVOTE_COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/{commentId}/upvote`,
  ECHO: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}`,
  POST_COMMENT: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/comments`,
  POST_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/echoes/{echoBoardId}/solutions`,
  UPVOTE_SOLUTION: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}/upvote`,
  USER: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user`,
  UPDATE_SOLUTION_STATUS: `${process.env.NEXT_PUBLIC_API_BASE_URL}/solutions/{solutionId}?updateToStage={status}`,
  LOGIN: `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`
};

// example from Marcus
// if(process.env.NEXT_PUBLIC_FF_MY_FEATURE === "ON"){
// alert("WIP");
// } 