import { formatEndpoint } from "@/utils/apiUtils";
import { ENDPOINTS } from "./config";
import {
  PostEchoBoardData,
  EchoBoardResponseData,
  CommentToPost,
  SolutionToPost,
  UserResponseData,
} from "./Types";

export async function postEcho(
  problemPostToSend: PostEchoBoardData,
  token: string
) {
  try {
    const response = await fetch(ENDPOINTS.POST_ECHO, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problemPostToSend),
      credentials: "include",
    });

    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function fetchEchoBoards(
  token: string
): Promise<EchoBoardResponseData[]> {
  try {
    const response = await fetch(ENDPOINTS.POST_ECHO, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardResponseData[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function upvotePost(echoBoardId: string, token: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.UPVOTE_POST, { echoBoardId });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function upvoteComment(
  echoBoardId: string,
  commentId: string,
  token: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.UPVOTE_COMMENT, {
      echoBoardId,
      commentId,
    });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log(response);
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function fetchEchoBoardById(echoBoardId: string, token: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHO, { echoBoardId });

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function postComment(
  commentToPost: CommentToPost,
  echoBoardId: string,
  token: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.POST_COMMENT, { echoBoardId });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(commentToPost),
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function postSolution(
  solutionToPost: SolutionToPost,
  echoBoardId: string,
  token: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.POST_SOLUTION, { echoBoardId });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(solutionToPost),
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function upvoteSolution(
  echoBoardId: string,
  solutionId: string,
  token: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.UPVOTE_SOLUTION, {
      echoBoardId,
      solutionId,
    });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function getUserInfo() {
  try {
    const response = await fetch(baseURL + "/user", {
      headers: {
       // Authorization: "Bearer " + token,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
   
    const data: UserResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

