import {
  PostEchoBoardData,
  EchoBoardResponseData,
  CommentToPost,
  SolutionToPost,
} from "./Types";

// const baseURL = "http://localhost:8080/api"; //development

const baseURL = "https://api.echoboard.site/api" //deployment

export async function postEcho(
  problemPostToSend: PostEchoBoardData,
  token: string
) {
  try {
    const response = await fetch(baseURL + "/echoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problemPostToSend),
      credentials: 'include',
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
    const response = await fetch(baseURL + "/echoes", {
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
    const response = await fetch(baseURL + `/echoes/${echoBoardId}/upvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
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
    const response = await fetch(
      `${baseURL}/echoes/${echoBoardId}/comments/${commentId}/upvote`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: 'include',
      }
    );

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
    const response = await fetch(baseURL + `/echoes/${echoBoardId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
      credentials: 'include',
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
    const response = await fetch(
      baseURL + "/echoes/" + echoBoardId + "/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(commentToPost),
        credentials: 'include',
      }
    );

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
    const response = await fetch(
      baseURL + "/echoes/" + echoBoardId + "/solutions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(solutionToPost),
        credentials: 'include',
      }
    );

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
    const response = await fetch(
      `${baseURL}/echoes/${echoBoardId}/solutions/${solutionId}/upvote`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: 'include',
      }
    );

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
